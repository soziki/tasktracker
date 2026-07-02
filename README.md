# tasktracker
A CRUD todo app, constructed with 2 phases (CRUD, Security Integration) 

Phase 1.1 : Backend

Containerizing the DB : 
docker run --name task-postgres \
-e POSTGRES_DB=taskdb \
-e POSTGRES_USER=taskuser \
-e POSTGRES_PASSWORD=taskpass \
-p 5432:5432 \
-d postgres:15

To see DB data  in the terminal : 
docker exec -it task-postgres psql -U taskuser -d taskdb

Table fields can be seen in model/Task.java .

There are 5 enpoints with GET(2), POST, PUT, and DELETE : 

GET : http://localhost:8080/api/tasks/        -> lists all tasks.
GET : http://localhost:8080/api/tasks/{id}    -> lists a certain task according to given id.

POST : http://localhost:8080/api/tasks	      -> saves a new task into the table with given body.

PUT : http://localhost:8080/api/tasks/{id}    -> updates an existing task in the table with a given body.

DELETE : http://localhost:8080/api/tasks/{id} -> deletes an existing task in the table according to given id.
 
