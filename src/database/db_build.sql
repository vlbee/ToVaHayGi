BEGIN; 

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  handle VARCHAR(26) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  surname VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  cohort VARCHAR(26),
  city VARCHAR(64),
  work_looking_status VARCHAR(1),
  about_me VARCHAR(3000)
);

INSERT INTO users (handle, first_name, surname, email, cohort, city, work_looking_status, about_me) VALUES
  ('@coder1', 'John', 'Tester', 'john@test.com', 'L13', 'London', 'y', null ),
  ('@coder2', 'Jane', 'Testing', 'jane@test.com', 'N02', 'Tel Aviv', 'y', null ),
  ('@coder3', 'Jim', 'Dummy', 'jim@test.com', 'L11', 'Berlin', 'n', null ),
  ('@coder4', 'Joan', 'Dummie', 'joan@test.com', 'L08', 'London', 'n', null ),
  ('@coder5', 'Janine', 'Dummoire', 'janine@test.com', 'L08', 'Paris', 'y', 'Full-Stack developer @ TechieFrenchCompanoire. Looking to help out on any FAC freelance opportunities involving Vue.js or MEAN stack. Also love helping with CSS.' );


DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  skill VARCHAR(64)
);

INSERT INTO skills (skill) VALUES 
  ('Javascript'),
  ('CSS'),
  ('HTML'),
  ('PostGreSQL'),
  ('MongoDB'),
  ('Express'),
  ('Angular'),
  ('PWA'),
  ('Elm'),
  ('Elixir'),
  ('React'),
  ('Vue'),
  ('Python'),
  ('D3');

DROP TABLE IF EXISTS user_skills CASCADE;
CREATE TABLE user_skills (
  user_id INT REFERENCES users(id) ON UPDATE CASCADE,
  skill_id INT REFERENCES skills(id) ON UPDATE CASCADE,
  start_date DATE
);

INSERT INTO user_skills (user_id, skill_id, start_date) VALUES
  (1, 5, '2018-10-01'),
  (1, 8, '2015-11-01'),
  (2, 1, '2015-11-01'),
  (2, 2, '2015-11-01'),
  (2, 3, '2015-11-01'),
  (3, 8, '2015-11-01'),
  (3, 10, '2015-11-01');
 

COMMIT;


