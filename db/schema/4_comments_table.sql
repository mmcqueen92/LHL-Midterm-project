DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
   card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
   content TEXT,
   level INTEGER DEFAULT 0
);