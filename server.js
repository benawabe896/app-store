var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/app-store');

app.use(bodyParser());
app.use(busboy());

// Routes
require('./app/routes/application.js')(router);
require('./app/routes/comment.js')(router);

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port);
