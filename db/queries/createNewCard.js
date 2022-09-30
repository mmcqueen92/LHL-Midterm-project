const db = require('../connection');

const createNewCard = (newCardObject, user_id) => {
  const values = [newCardObject.title, newCardObject.description, newCardObject.url, user_id]
  const queryString = `
  INSERT INTO cards (user_id, title, description, url)
  VALUES ($4, $1, $2, $3)
  RETURNING*;
  `;
  return db.query(queryString, values)
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { createNewCard };
