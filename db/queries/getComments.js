const db = require('../connection');

const getComments = (card_id) => {
  // Store this as a $1,2,3 template value to protect against sql injections
  const values = [card_id];
  return db.query(`SELECT * FROM comments WHERE card_id = $1;`, values)
  .then((res) => {
    return res.rows;
  })
};

module.exports = { getComments };
