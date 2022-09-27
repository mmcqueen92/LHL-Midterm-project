const express = require('express');
const router = express.Router();
const cardQuery = require('../db/queries/getAllCards.js');


router.get('/', (req, res) => {
    console.log('reg', req);
    console.log('res', res);
    cardQuery.getAllCards()
    .then((cardInfo) => {
        // passsing in the cardInfo as res json object here to app.js
        res.json(cardInfo)
    })
})




module.exports = router;
