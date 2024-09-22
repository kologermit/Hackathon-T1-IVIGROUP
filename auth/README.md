Host: auth
Port: 8080

GET /sign-in/
* user
* hash
Ответы
* 400/param user not found
* 400/param hash not found
* 400/user not found
* 500/server error
* 200/success, data: {"token": token}

GET /auth/
* user
* token
Ответы
* 400/param user not found
* 400/param token not found
* 400/token not found
* 400/token is expired
* 200/success data: null

GET /log-out/
* user
* token
Ответы
* 400/param user not found
* 400/param token not found
* 400/token not found
* 200/success data: null