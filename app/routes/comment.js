var Comment = require('../models/comment');

module.exports = function(router){
  // Comments
  router.route('/comments')
    .get(function(req, res) {
      Comment.find(function(err, comments){
        if(err) {
          return res.send(err);
        }

        res.json(comments);
      });
    });

  // Comment
  router.route('/comments/:comment_id')
    .get(function(req, res) {
      Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
          return res.send(err);
        }

        res.json(comment);
      });
    })
    .put(function(req, res) {
      Comment.findById(req.params.comment_id, function(err, comment){
        if(err) {
          return res.send(err);
        }
        
        if(!comment){
          res.send({error: 'No comment found with that Id'});
        }


        if(!req.body.description){
          return res.send({error: 'Missing required parameters'});
        }

        comment.description = req.body.description;

        comment.save(function(err) {
          if(err) {
            return res.send(err);
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
          return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
      });
    });
};
