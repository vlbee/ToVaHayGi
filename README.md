# Database & Authentication Week Project: StackMatch

Create a simple webapp for the FAC community, where FAC alums and students could connect with each other based on their technical stack skills. 

### User Stories

1. As a user I can login to my account, or sign up and create a new accout. 
2. As a user, when I sign up, I can easily create a user profile and add my stack skills, but only minimum information is required at the start to complete the signup process. 
3. As a user, I have the the option to update my user profile at any time, and add or remove stack skills.
4. As a user, I can search for stack skills from an autocomple (or dropdown?) menu. If I cannot find my skill, I can easily add a new skill to the DB. 
5. As a user, I can easily see the profiles of all other signed up FAC community members and their stack skills. 
6. As a user, I can easily search OR filter the community members by key information: 
    - Skill
    - City
    - Whether they are interested in new work opportunities.
7. STRETCH GOAL - As a user, I can create and own a new 'Project'/'Opportunity' with specific stack requirements. 
8. STRETCH GOAL - As a user, I can invite other community members that match the stack requiments to join my project. 


### Key Project Requirements

1. Simple web app with a node server and a database
2. DB includes schema documentation and is hosted on Heroku. 
3. DB built with PostgreSQL 
4. DB Security concerns appropriately considered (ie. script injections)
5. Content dynamic, but DOM manipulation kept to a minimum
6. Mobile-first design
7. Clear user journey 
8. Clear software architecture planned out. 

*Authentication Requirements to be added*

### Instructions on how to run the project locally

1.  `git clone https://github.com/fac-13/ToVaHayGi.git`
    
2.  `npm i`
    
3.  Set up a local database as per below instructions:
    

-   Connect to postgres, by typing `psql` in the terminal on MAC, and `sudo -u postgres psql` on ubuntu.
-   Create the database by typing `CREATE DATABASE [the name of the database];`. (best not to use a hyphen `-` in the database name, as this can cause issues in the following steps)
-   Create a superuser with a password by typing `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]';` (the password needs to be in quotes, otherwise you get an error).
-   Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username];`
-   Add a config.env file in the root folder and add the database's url in this format: `DATABASE_URL = postgres://[username]:[password]@localhost:5432/[database]`. The database name needs to be in lower case.

4.  Build the database by connecting to postgres and typing `\i` \+ correct path + `/ToVaHayGi/src/database/db_build.sql`
5.  Exit psql and run `npm start`


### Journey 

##### Week 1

1. Set up basic architecture & postgresQL schema. Build Database - PRIORITY
2. Create User Profile & Update User Profile Page (basic html skeleton) - STRETCH GOAL
3. **User List Page** - shows all users and their stack based on DB data - PRIORITY

##### Week 2

1. Landing page - add login & sign up authentication - PRIORITY
2. Filter/Search by stack functionality
3. CSS / Front-End UX.
4. Ensure Testing and Code Coverage is addressed. 
5. Fold down separate html pages into a Single-Page-App if appropriate - STRETCH GOAL
6. Add User Projects to DB & UX - STRETCH GOAL

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
- user_profile.html (after signup view - dynamic for update/create profile view - currently 2x seprate pages
- style.css
- dom.js
- TBC Logic -> filter results?? 
- Assets folder for user pictures?? - STRETCH GOAL


#### Source
- server.js
- router.js
- handlers.js
- queryLogic.js (Do we need this??) 
- Test Folder
    - sqlquerylogic.test.js
    - db.test.js
- DB Folder
    - db_connect.js
    - db_build.js
    - db_build.sql
- Queries (Do we merge this into one logic file ??) 
    - getListData
    - getProfileData
    - postProfileData (STRETCH - completed in week 1 👍)
