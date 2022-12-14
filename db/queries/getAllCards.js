const db = require('../connection');

const getAllCards = () => {
  const queryString = `
  SELECT cards.*, COUNT(card_likes.*) AS likes
  FROM cards
  FULL OUTER JOIN card_likes ON card_id = cards.id
  GROUP BY cards.id;
  `;
  return db.query(queryString)
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllCards };
