var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/app-store');
var Application = require('./app/models/application');

app.use(bodyParser());

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/applications')
	.post(function(req, res) {
		
		var application = new Application();
		application.name = req.body.name;

		application.save(function(err) {
			if(err){
				res.send(err);
			}
			res.json({message: 'Application created!' });
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

app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);
