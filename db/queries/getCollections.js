const db = require('../connection');

const getCollections = (user_id) => {
  // Store this as a $1,2,3 template value to protect against sql injections
  const values = [user_id];
  const queryString = `
    SELECT name, id
    FROM collections
    WHERE collections.user_id = $1;
  `;

  return db.query(queryString, values)
  .then((res) => {
    return res.rows;
  })
};

module.exports = { getCollections };

// THIS GETS US: all collection names, all cards in those collections (regardless who made them) for CURRENT user from /login/:userid

// SELECT collections.user_id AS collection_owner, collections.*, cards.user_id AS card_owner, cards.*
// FROM collections
// JOIN cards_collections ON collection_id = collections.id
// JOIN cards ON cards_collections.card_id = cards.id
// WHERE collections.user_id = 4
// GROUP BY collections.id, cards.id;
