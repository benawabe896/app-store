var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var fs = require('fs');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/app-store');
var Application = require('./app/models/application');
var Comment = require('./app/models/comment');

app.use(bodyParser());
app.use(busboy());

var port = process.env.PORT || 3000;
var router = express.Router();

// Applications Endpoints
router.route('/applications')
  .post(function(req, res) {
    
    var application = new Application();
    application.name = req.body.name;
    application.description = req.body.description;
    application.author = req.body.author;
    application.price = req.body.price;

    application.save(function(err) {
      if(err){
        res.send(err);
      }
      res.json(application);
    });
  })
  .get(function(req, res) {
    Application.find(function(err, applications) {
      if(err) {
        res.send(err);
      }
      res.json(applications);
    });
  });

// Applications Search
router.route('/applications/search')
  .get(function(req, res){

    var queryParams= {};
    var searchType = req.query.st || 'name';
    switch(searchType){
      case 'price':
        var ranges = req.query.range.split('-');
        queryParams[searchType] = {$gte: ranges[0], $lt: ranges[1]};
        break;
      case 'name':
      case 'description':
      case 'author':
      case 'default':
        queryParams[searchType] = {$regex: new RegExp(req.query.q, 'i')};
        break;
    }

    Application.find(queryParams, function(err, applications){
      if (err) {
        res.send(err);
      }

      res.json(applications);
    });
  });

// Application Endpoints
router.route('/applications/:application_id')
  .get(function(req, res) {
    Application.findById(req.params.application_id, function(err, application) {
      if(err) {
        res.send(err);
      }

      res.json(application);
    });
  })
  .put(function(req, res) {
    Application.findById(req.params.application_id, function(err, application){
      if(err) {
        res.send(err);
      }

      application.name = req.body.name;
      req.body.description && (application.description = req.body.description);
      req.body.author && (application.author = req.body.author);
      req.body.price && (application.price = req.body.price);

      application.save(function(err) {
        if(err) {
          res.send(err);
        }

        res.json(application);
      });
    });
  })
  .delete(function(req, res) {
    Application.remove({
      _id: req.params.application_id
    }, function(err) {
      if(err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

// Application Upload
router.route('/applications/:application_id/upload')
  .post(function (req, res) {
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file) {
          fstream = fs.createWriteStream(__dirname + '/data/' + req.params.application_id);
          file.pipe(fstream);
          fstream.on('close', function () {
            res.json({ message: 'Binary uploaded!' });
          });
      });
  });

// Application Download
router.route('/applications/:application_id/download')
  .get(function(req, res) {
    var file = __dirname + '/data/' + req.params.application_id;
    res.download(file);
  });

// Application Comments
router.route('/applications/:application_id/comments')
  .post(function(req, res) {

    var comment = new Comment();
    comment.description = req.body.description;
    comment.application_id = req.params.application_id;

    comment.save(function(err) {
      if(err){
        res.send(err);
      }
      res.json(comment);
    });
  })
  .get(function(req, res) {
    Comment.find({application_id: req.params.application_id}, function(err, comments) {
      if(err) {
        res.send(err);
      }

      res.json(comments);
    });
  });

// Application Comments Endpoints
router.route('/comments/:comment_id')
  .get(function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if(err) {
        res.send(err);
      }

      res.json(comment);
    });
  })
  .put(function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment){
      if(err) {
        res.send(err);
      }

      comment.description = req.body.description;

      comment.save(function(err) {
        if(err) {
          res.send(err);
        }

        res.json(comment);
      });
    });
  })
  .delete(function(req, res) {
    Comment.remove({
      _id: req.params.comment_id
    }, function(err) {
      if(err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);
