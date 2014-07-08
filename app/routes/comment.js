var Comment = require('../models/comment');

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
