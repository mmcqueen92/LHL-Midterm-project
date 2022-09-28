const db = require('../connection');

const getComments = (card_id) => {
  const queryString = `
    SELECT comments.*, users.name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.card_id = $1;
  `;
  // Store this as a $1,2,3 template value to protect against sql injections
  const values = [card_id];
  return db.query(queryString, values)
  .then((res) => {
    return res.rows;
  })
};

module.exports = { getComments };

