const express = require('express');
const router = express.Router();
const commentsQuery = require('../db/queries/getComments.js');

// Full route is => /api/comments/:card_id
router.get('/:card_id', (req, res) => {
  console.log("AJAX request FROM card id: ", req.params.card_id);
  commentsQuery.getComments(req.params.card_id)
  // commentsData = res.rows from db query
  .then((commentsData) => {
    // Once queried the comments for this particular card_id passed back as json data to client script
    res.json(commentsData);
  })
});

module.exports = router;
