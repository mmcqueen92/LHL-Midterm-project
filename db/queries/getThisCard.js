const db = require('../connection');

const getThisCard = (card_id) => {
  const values = [card_id];
  return db.query(`SELECT * FROM cards WHERE cards.id = $1`, values)
  .then((data) => {
    console.log('from query data.rows 0 = ', data)
    return data.rows[0];
  });
};

module.exports = { getThisCard };
