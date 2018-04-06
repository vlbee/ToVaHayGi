# ToVaHayGi

STACKMATCH - a website to find FAC alums and students by their technical stack skills.

### Instructions on how to run the project

1.  `git clone https://github.com/fac-13/ToVaHayGi.git
`
    
2.  `npm i`
    
3.  Set up a local database as per below instructions:
    

-   Connect to postgres, by typing `psql` in the terminal on MAC, and `sudo -u postgres psql` on ubuntu.
-   Create the database by typing `CREATE DATABASE [the name of the database];`. (best not to use a hyphen `-` in the database name, as this can cause issues in the following steps)
-   Create a superuser with a password by typing `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]';` (the password needs to be in quotes, otherwise you get an error).
-   Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username];`
-   Add a config.env file in the root folder and add the database's url in this format: `DATABASE_URL = postgres://[username]:[password]@localhost:5432/[database]`. The database name needs to be in lower case.

4.  Build the database by connecting to postgres and typing `\i` \+ correct path + `/ToVaHayGi/src/database/db_build.sql`
5.  Exit psql and run `npm start`


### Goals

1. Set up basic architecture, postgresQL schema.

1. Landing page - Week 2 add login & sign up authentication - WEEK 2
2. User Profile page & Update/Create User Profile Page (basic html skeleton) - STRETCH GOAL
3. **User List Page - Week 1 priority** - shows all users and their stack based on DB data. 
4. Stack List Page - Back up if we can't include skill filter functionality on User List 



### DB SCHEMA

![visual database schema](https://i.imgur.com/NlozAp9.png)

#### Table - users
- primary key
- handle
- first_name
- surname
- email
- cohort
- location
- about_me (STRETCH)
- status - looking for work, not looking for work

#### Table - skills
- primary key
- skill
- Tags? frontend vs backend? design??? 


#### Table - user_skills (connecting many2many)
- user_primary_key
- skill_primary key
- start_date

### ARCHICTECTURE

![App architecture](https://i.imgur.com/nyCazrt.jpg) 

#### Public

- index.html (landing page)
- user_list.html (after login view)
- user_profile.html (after signup view - dynamic for update/create profile view)
- style.css
- dom.js
- TBC Logic -> filter results?? 


#### Source
- server.js
- router.js
- handlers.js
- SQLqueryLogic.js
- Test Folder
    - sqlquerylogic.test.js
    - db.test.js
- DB Folder
    - db_connect.js
    - db_build.js
    - db_build.sql
- Queries (replaces logic??) 
    - getListData
    - getProfileData
    - postProfileData (STRETCH)
  
