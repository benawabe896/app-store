var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/app-store');

require('./app/routes/application.js');

app.use(bodyParser());
app.use(busboy());

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port);
