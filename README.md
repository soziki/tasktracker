# Tasktracker - Keycloak integrated

Hello, there...again

In this branch you can see all the functionalities from legacy version, and ***beyond*** .

But first, please be sure do the following : 
```sh
$ cd <your_local_repo_name> # this is tasktracker by default
$ git checkout keycloak-exp # correct branch 
```
Then you shall see the some files added, some discarded. 
##

### So, What Changed ? 

* Role based access added (different user, admin screens and APIs)
* Instead of Custom JWT methods, Keycloak integrated
* In this version, a USER can only see the its assigned tasks. On the other hand, an ADMIN is a task assigner, remover, modifier and lister.

##
In the legacy version, we used to have a users table in posgres. We used to keep the hashed version of the passwords and generate tokens after comparisons over hashed values. In this version, we don't do that, Keyvcloak manages the users instead of us. You can think the Keycloak as a shell covers our client app and manages the login/logout/register authentication of users. 
##
### Run / Stop
Same with the main branch, but at **each** branch change you should run the compose command with **--build** once. Simply, 

```sh
$ git checkout keycloak-exp
$ docker compose up --build # first run
# you are doing crud, compose down/up several times..
$ git checkout main # careful!
$ docker compose up --build # first run
# you are doing crud, compose down/up several times..
.. 
```

If you want to add new users to the system (register), you should assign roles to them, otherwise you can see an error status code in the screen because authorization will be failed. 

You can manage this by opening the Keycloak Admin Dashboard. Since the Keycloak Server will run on your localhost:8081, http://localhost:8081 will route you the login screen. You can use : 

* Username : admin 
* Userpassword : admin

Also, the app has one ADMIN and two USERs ready to be used. You can login the tasktracker app by using their credentials. 

* ADMIN : test-admin, 1234
* USER(s) : USER1 -> test-user, 1234. USER2 -> test-user-1, 1234

##
For further instructions about Keycloak, visit https://www.keycloak.org/ .