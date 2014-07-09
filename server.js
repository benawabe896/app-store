var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var busboy = require('connect-busboy');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/app-store');

app.use(bodyParser());
app.use(busboy());

// Routes
require('./app/routes/application.js')(router);
require('./app/routes/comment.js')(router);

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
    if(fs.existsSync(file)) {
      res.download(file);
    } else {
      res.send({error: 'No binary associated with Application Id'});
    }
  });

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port);
