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

// CREATE TABLE cards (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   title VARCHAR(255) NOT NULL,
//   description TEXT,
//   url TEXT,
//   created_at TIMESTAMP
// );
