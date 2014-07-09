var Application = require('../models/application');
var Comment = require('../models/comment');

module.exports = function(router){
  // Applications
  router.route('/applications')
    .post(function(req, res) {
      
      if(!req.body.name || !req.body.description || !req.body.author || !req.body.price){
        return res.send({error: 'Missing required parameters'});
      }

      if(isNaN(req.body.price)){
        return res.send({error: 'Price is not a number'}); 
      }

      var application = new Application();
      application.name = req.body.name;
      application.description = req.body.description;
      application.author = req.body.author;
      application.price = req.body.price;

      application.save(function(err) {
        if(err){
          return res.send(err);
        }
        res.json(application);
      });
    })
    .get(function(req, res) {
      Application.find(function(err, applications) {
        if(err) {
          return res.send(err);
        }
        res.json(applications);
      });
    });

  // Applications Search
  router.route('/applications/search')
    .get(function(req, res){
      if(!req.query.q){
        return res.send({error: 'q parameter required'}); 
      }

      // Sort Options
      var sortBy = req.query.sortBy || 'name';
      var sortParams = {};
      sortParams[sortBy] = 'desc';

      // Query Options
      var queryParams= {};
      var searchType = req.query.searchField || 'name';
      queryParams[searchType] = {$regex: new RegExp(req.query.q, 'i')};

      if(searchType === 'price'){
        if(!req.query.range){
          return res.send({error: 'Range parameters required for price search type'}); 
        }
        var ranges = req.query.range.split('-').map(function(range){
          return parseInt(range);
        }).sort();

        if(ranges.length !== 2 || isNaN(ranges[0]) || isNaN(ranges[1])){
          return res.send({error: 'Invalid Range Values'});
        }
        queryParams[searchType] = {$gte: ranges[0], $lt: ranges[1]};
      }

      Application.find(queryParams).sort(sortBy).exec(function(err, applications){
        if (err) {
          return res.send(err);
        }

        res.json(applications);
      });
    });

  // Application Endpoints
  router.route('/applications/:application_id')
    .get(function(req, res) {
      Application.findById(req.params.application_id, function(err, application) {
        if(err) {
          return res.send(err);
        }

        res.json(application || {error: 'Appication Id not found'});
      });
    })
    .put(function(req, res) {
      Application.findById(req.params.application_id, function(err, application){
        if(err) {
          return res.send(err);
        }
        
        if(!application){
          res.send({error: 'No application found with that Id'});
        }

        req.body.name && (application.name = req.body.name);
        req.body.description && (application.description = req.body.description);
        req.body.author && (application.author = req.body.author);
        req.body.price && (application.price = req.body.price);

        application.save(function(err) {
          if(err) {
            return res.send(err);
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
          return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
      });
    });

  // Application Comments
  router.route('/applications/:application_id/comments')
    .post(function(req, res) {
      if(!req.body.description){
        return res.send({error: 'Missing required parameters'});
      }

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
};
