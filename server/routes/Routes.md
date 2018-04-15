# Routes

* GET  /api/login/          - Google passport authenticate.
* GET  /api/login/return    - Google passport authentication callback.
* GET  /api/logout/         - Logs a user out of the application.
* GET  /api/user/           - Gets current user's data.
* GET  /api/life/users/     - Provides a list of all users in the system.
* GET  /api/life/users/:id  - Looks a user up by unique ID.
* POST /api/life/users/:id  - Updates a user's information.
* POST /api/life/users/:id/permissions - Updates the permissions for a user.
* GET  /api/life/roles/     - Provides a list of all roles in the system.
* GET  /api/life/timezones/ - Provides a list of all timezones in the system.
* ALL  "*"                  - Catch all for front-end.


# New Routes

* GET  /api/security/authenticate - Google passport authenticate.
* GET  /api/login/return          - Google passport authentication callback. This needs to be `/api/security/authenticate-callback`
* GET  /api/security/logout       - Logs a user out of the application.
* GET  /api/security/current-user - Gets current user's data.
* GET  /api/sql/users/            - Provides a list of all users in the system.
* GET  /api/sql/users/:id         - Looks a user up by unique ID.
* POST /api/sql/users/:id         - Updates a user's information.
* POST /api/sql/users/:id/permissions - Updates the permissions for a user.
* GET  /api/sql/roles/            - Provides a list of all roles in the system.
* GET  /api/sql/timezones/        - Provides a list of all timezones in the system.
* ALL  "*"                        - Catch all for front-end.
