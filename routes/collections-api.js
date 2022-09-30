const express = require('express');
const router = express.Router();
const collectionsQuery = require('../db/queries/getCollections.js');
const getCardsForCollection = require(`../db/queries/getSingleCollection.js`)

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


// Full route => /api/collections/:collection_id
router.get(`/:collection_id`, (req, res) => {
  const collection_id = req.params.collection_id;
  getCardsForCollection.getSingleCollection(collection_id)
  .then((cardsInCollection) => {
    console.log(`cardsInCollection: `, cardsInCollection);
    res.json(cardsInCollection);
  })
})

module.exports = router;
