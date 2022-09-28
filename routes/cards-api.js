const express = require('express');
const router = express.Router();
// Queries data for ALL cards
const cardsQuery = require('../db/queries/getAllCards.js');
// Queries data for ONE card
const singleCard = require('../db/queries/getThisCard.js');

// Full route is => /api/cards/
router.get('/', (req, res) => {
  // Backend - please do some querying for me
  cardsQuery.getAllCards()
  // cardTileInfo = res.rows from db query
  .then((cardTileInfo) => {
      // passsing in the cardTileInfo as res json object here to app.js
      res.json(cardTileInfo)
  })
});

// Full route is => /api/cards/:card_id
router.get('/:card_id', (req, res) => {
  console.log(req.params.card_id) // = /:card_id
  // Backend - please do some querying for me
  singleCard.getThisCard(req.params.card_id) // NEW FUNCTION NEEDS TO BE DECLARED
  // cardTileInfo = res.rows from db query
  .then((singleCardInfo) => {
      // passsing in the singleCardInfo as res json object here to app.js
      res.json(singleCardInfo)
  })
});




module.exports = router;
