const express = require('express');
const router = express.Router();
const collectionsQuery = require('../db/queries/getCollections.js');

// Full route => /api/collections/
router.get('/', (req, res) => {
  // the cookie session notes that a user is logged in, that's their user-id
  const user_id = req.session.user_id;
  if (!user_id) {
    res.send(`error: 404`);
  }

  // else continue to query
  if (user_id) {
    collectionsQuery.getCollections(user_id)
    .then((collectionsData) => {
      console.log(collectionsData);
      res.json(collectionsData);
    })
  }

})


module.exports = router;
