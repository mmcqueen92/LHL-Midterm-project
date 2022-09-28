const db = require('../connection');

const getAllCards = () => {
  return db.query('SELECT * FROM cards;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getAllCards };
