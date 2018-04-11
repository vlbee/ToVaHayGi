BEGIN; 

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  handle VARCHAR(26) NOT NULL UNIQUE,
  email VARCHAR(100)
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),  
  pw VARCHAR(100) NOT NULL,  
  first_name VARCHAR(100),
  surname VARCHAR(100),
  cohort VARCHAR(26),
  city VARCHAR(64),
  work_looking_status VARCHAR(1),
  about_me VARCHAR(3000)
);

INSERT INTO users (handle, email, pw, first_name, surname, cohort, city, work_looking_status, about_me) VALUES
  ('@coder1', 'john@test.com', 'Johnpassword1!', 'John', 'Tester', 'L13', 'London', 'y', null ),
  ('@coder2', 'jane@test.com','Janepassword1!', 'Jane', 'Testing', 'N02', 'Tel Aviv', 'y', null ),
  ('@coder3', 'jim@test.com','Jimpassword1!', 'Jim', 'Dummy', 'L11', 'Berlin', 'n', null ),
  ('@coder4','joan@test.com','Joanpassword1!', 'Joan', 'Dummie',  'L08', 'London', 'n', null ),
  ('@coder5','janine@test.com','Janinepassword1!', 'Janine', 'Dummoire',  'L08', 'Paris', 'y', 'Full-Stack developer @ TechieFrenchCompanoire. Looking to help out on any FAC freelance opportunities involving Vue.js or MEAN stack. Also love helping with CSS.' );


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


