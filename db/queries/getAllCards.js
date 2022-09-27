const db = require('../connection');

const getAllCards = () => {
  return db.query('SELECT * FROM cards;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllCards };
