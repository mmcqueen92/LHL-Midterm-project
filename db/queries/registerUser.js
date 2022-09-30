const db = require('../connection');

const registerUser = (email) => {
  const values = [email]
  const queryString = `
  INSERT INTO users (email)
  VALUES ($1)
  RETURNING *;
  `;
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    });
};

module.exports = { registerUser };

