DROP TABLE IF EXISTS cards_collections CASCADE;

CREATE TABLE cards_collections (
  id SERIAL PRIMARY KEY NOT NULL,
   collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
   card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE
);
