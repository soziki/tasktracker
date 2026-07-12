# tasktracker
A CRUD todo app, constructed with 2 phases (CRUD, Security Integration) 

Containerizing the DB : 
docker run --name task-postgres \
-e POSTGRES_DB=taskdb \
-e POSTGRES_USER=taskuser \
-e POSTGRES_PASSWORD=taskpass \
-p 5432:5432 \
-d postgres:15

To see DB data  in the terminal : 
docker exec -it task-postgres psql -U taskuser -d taskdb

To run the app, use these in different terminals : 

cd backend/tasktracker
mvn spring-boot:run 

and 

cd frontend/
npm run dev


Phase 1.1 : Backend

Table fields can be seen in model/Task.java .

There are 5 enpoints with GET(2), POST, PUT, and DELETE : 

GET : http://localhost:8080/api/tasks/        -> lists all tasks.

GET : http://localhost:8080/api/tasks/{id}    -> lists a certain task according to given id.

POST : http://localhost:8080/api/tasks	      -> saves a new task into the table with given body.

PUT : http://localhost:8080/api/tasks/{id}    -> updates an existing task in the table with a given body.

DELETE : http://localhost:8080/api/tasks/{id} -> deletes an existing task in the table according to given id.


Phase 1.2 : Frontend

Simple and basic one page window has been designed. All five CRUD operations can be observed and tested.


Phase 2.1 : Backend 

In this phase, Spring Security features and JWT logic are added to project. In the phase 1, backend was including Control -> Service -> Repository -> Model (Class -><- DB Table) layers. Additional *Filter -> Control -> ... added to design. The role of filter layer is directing authenticated request to control layer, returning to sender without api access otherwise. To achieve that additional user table has been implemented (See model/User.java). 

When a user registers, the password is hashed according to a certain secret key and stored in db. The conditional checks, comparisons are held by hashed value.

After each successful login, a token is assigned to user which lasts for a certain amount of time. After token expires, user must be log in again. 

There are 3 endpoints added, 1 of them is *experimental so it is not seen in Frontend : 

POST : http://localhost:8080/api/auth/register  ->  user registeration with username, password

POST : http://localhost:8080/api/auth/login     ->  db check and token generation

*POST : http://localhost:8080/api/auth/refresh  ->  token generation by using refresh token


Phase 2.2 : Frontend

In this phase, login/register form added as another page. 
