# MEAN Angular 2 Authentication

This project is a Work in Progress for handle basic authentication in a MEAN project.

You can signup and signin, the account is registered in a mongoDB collection.

## Technologies used
* [MongoDB](https://www.mongodb.com/)
* [Express](http://expressjs.com/)
* [Angular 2](https://angular.io/)
* [NodeJS](https://nodejs.org/en/)

Others technologies used:
* [Bootstrap](http://getbootstrap.com/)
* [Angular2-jwt](https://www.npmjs.com/package/angular2-jwt)
* [Passport](http://passportjs.org/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Validator](https://www.npmjs.com/package/validator)

### Run
You need MongoDB and Node.js installed to run this project.

1. `mongod`
2. `npm install`
3. `npm start`
4. Go to [localhost:3000](http://localhost:3000)

The server will auto restart on changes, but you still need to refresh your browser.

## How to use
You can create an account in the signup page, then you can loggin in the signin page. The accounts are registered in a mongoDB collection. An account requires email and password. The password is crypted in the collection.

If you are logged, the private page show you your email, if not, it show you a different message.

#### Thanks and links
I started with the [DavideViolante's project](https://github.com/DavideViolante/Angular2-Express-Mongoose), and I added the authentication system.

Two tutorials helped me a lot:
* [https://devdactic.com/restful-api-user-authentication-1/](https://devdactic.com/restful-api-user-authentication-1/)
* [http://youknowriad.github.io/angular2-cookbooks/stateless-authentication.html](http://youknowriad.github.io/angular2-cookbooks/stateless-authentication.html)

Thanks for their help.
