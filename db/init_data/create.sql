DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE IF NOT EXISTS games (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player VARCHAR(16) NOT NULL,
  score INT NOT NULL,
  moves INT NOT NULL,
  difficulty VARCHAR(16) NOT NULL,
  time INT NOT NULL,
  date DATE NOT NULL
);

-- INSERT INTO games(player, score, moves, difficulty, time, date)
-- VALUES('Zelkins', 25, 84, 'easy', 134, NOW()),
--       ('Robbyfrig', 15, 65, 'hard', 98, NOW())
-- ;