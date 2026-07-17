# tasktracker - Keycloak integrated

1. Introduction

In this branch, keycloak services added to app. These are login, logout, register, role-based permission and user storage.

-> To run this version, addition to the legacy testtracker, run : 

docker run -p 127.0.0.1:8081:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.7.0 start-dev

When an account is registered, it is not authenticated since no roles are assigned them initially, hence the account can not have access to use services (unauthorized)

After that, an admin should assign the role of the account via keycloak. Then the user is granted with access rights according to the role (user, manager, admin)


2. Changes

The previous /login, /register, /refresh are discarded since these are now handled thanks to keycloak.

Following apis are added : 

GET : http://localhost:8080/api/tasks/usr       ->  Lists the task assigned to callee user. 
GET : http://localhost:8080/api/tasks/usr/{id}  ->  Returns the task assigned to callee user with given id.

These two apis can be called by only user roles. Rest can be called by both admin and manager roles. The different between admin and manager is about account management. Admin and manager have similar rights about task management but account management (role assignments etc.) can be done by admin via keycloak - this is the scenario. 