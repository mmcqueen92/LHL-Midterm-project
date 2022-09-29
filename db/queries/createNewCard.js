const db = require('../connection');

const createNewCard = (newCardObject) => {
  const values = [newCardObject.title, newCardObject.description, newCardObject.url]
  const queryString = `
  INSERT INTO cards (title, description, url)
  VALUES ($1, $2, $3)
  RETURNING*;
  `;
  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { createNewCard };
