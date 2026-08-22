# Tasktracker App
Hello there, in this repository you can inspect a web app, designed according to labeled architecture and integrated with login/register/logout services. 

If you are a CE/CS/SE student, I believe the code fragments, and logic behind the app (methods, folder hieararchy etc.) are perfect for you. Eventhough the app is **faaar far away from being perfect**, at least has some solid interactions and integrations between db, backend, frontend and an IAM software called Keycloak (It's a rare thing btw) .

Notice that there are two seperate branches, main and keycloak-exp. The difference between them is handling way of authentication. In the main branch you can see the custom JWT generation, and claim extraction methods. In the keycloak-exp branch, we use the authentication services provided by keycloak. 

Please first understand the first version of the app. Custom JWT methods can gain you practical insights about JWT, login, logout, session timeout, requests bearing tokens etc. 

Enjoy, I hope that this repo is useful for you. 

### What is Tasktracker ? 

Tasktracker is a simple task management application. It enables task assignment to a person; modify, delete, and list them after. (Basic CRUD app)

### What can you observe from Tasktracker ?

You can see : 

* Layered Architecture with Spring Boot
* Frontend with React Vite
* PostgreSQL
* Keycloak Integration
* Dockerizing a Project

##

### Run

First, clone this repo. Then :
```sh
$ cd <your_local_repo_name> # this is tasktracker by default
$ docker compose up # add --build if you make some changes in code. 
```
If you want to explicitly observe the database, you can get in the postgres container. 

In any non-busy terminal, do :
```sh
$ docker exec -it postgres psql -U taskuser -d taskdb 
```
Then you can see you are in the interactive db terminal. 

And notice that the app is invoked on port localhost:5173, after you start the app you can copy http://localhost:5173/ to your browser and use the app. 

### Stop
Since the terminal that is used to start the app is still occupied, you should use a new terminal and do : 

```sh
$ cd <your_local_repo_name> # this is tasktracker by default
$ docker compose down # all the containers are removed 
```