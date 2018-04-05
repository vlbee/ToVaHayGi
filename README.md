# ToVaHayGi

STACKMATCH - a website to find FAC alums and students by their technical stack skills.

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
  
