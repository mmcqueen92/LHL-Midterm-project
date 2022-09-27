const db = require('../connection');

const getAllCards = () => {
  return db.query('SELECT * FROM cards;')
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    });
};

module.exports = { getAllCards };
