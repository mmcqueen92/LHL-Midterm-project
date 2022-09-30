const db = require('../connection');

const getSingleCollection = (collection_id) => {
  const values = [collection_id];
  const queryString = `
  SELECT *
  FROM cards_collections
  LEFT JOIN cards ON cards_collections.card_id = cards.id
  WHERE cards_collections.collection_id = $1;
  `;
  return db.query(queryString, values)
    .then(data => {
      console.log(`data.rows: `, data.rows);
      return data.rows;
    });
};

module.exports = { getSingleCollection };
