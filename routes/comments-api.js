const express = require('express');
const router = express.Router();
const commentsQuery = require('../db/queries/getComments.js');
const insertComment = require('../db/queries/createNewComment.js');

// Full route is => /api/comments/:card_id
router.get('/:card_id', (req, res) => {
  commentsQuery.getComments(req.params.card_id)
  // commentsData = res.rows from db query
  .then((commentsData) => {
    // Once queried the comments for this particular card_id passed back as json data to client script
    res.json(commentsData);
  })
});

//
// ----- POST routers for /api/comments -----
//

// Full route => /api/comments/

router.post('/:card_id', (req, res) => {
  console.log(`request body: `, req.body);
  insertComment.createNewComment(req.params.card_id, req.body)
  .then((commentsInDB) => {
    console.log(`new comment in DB: `, commentsInDB);
    return;
  })
});

module.exports = router;
