const db = require('../connection');

const createNewComment = (card_id, newCommentObject) => {
  const values = [card_id, newCommentObject.text]
  const queryString = `
  INSERT INTO comments (card_id, content)
  VALUES ($1, $2)
  RETURNING*;
  `;
  return db.query(queryString, values)
    .then(data => {
      console.log('New comment: ', data.rows);
      return data.rows[0];
    });
};

module.exports = { createNewComment };

