sails-authorization
===================

Node with [sails.js](http://sailsjs.org/#!) mvc framework, Using passport logins + token based security 

How it works
===================

Sails is an mvc framework for organizing node applications using express. It provides structure to Models, controlers, polocies and adapters, and I use these in a way to authenticate users. Sails also builds an api available to the models we create and allows us to create our own routing system. For the purpose of this project, I will not be using the views system sails makes available and instead will use another node server to fake a mobile client. In the future, it would be good to use another framework system like [yeoman](http://yeoman.io/) to organize the client code. 

###Models

We start by creating our user model. Sails makes this very easy to do, check out their documentation to see how to do this. We add the fields we want including our username and password field. 

We override the beforeCreate method of the model to salt and hash the incoming password with bcrypt. We also override the toJSON method to ensure we are never sending the salted, hashed password back

###Controllers

We next add an AuthController into the api/controllers directory. This file will control authorization requests to the server. There are 2 authorization requests I have setup: login and logout. We use passport local authentication here to authenticate the user. We will get into the configuration of passport later on. If the user successfully logs in, we generate a token with [jwt (jsonwebtoken)](https://www.npmjs.org/package/jsonwebtoken) and attatch the oser object to it. This will allow us to determine who's token this is later on when they make a request. We must send this token back to the user to keep for themselves. 

Logout is pretty straight forward. It's important to destroy the users token but currently I don't. 

###Passport

We need to setup passport to help check the user's credentials. We technically don't need passport since we are not using session authentication, but for the sake of being able to swap out authentication portals I still use it. Passport setup is the same here as we would use it in any other app, except here we control our own password checking. We once again use bcrypt to hash the password and check it against the user's password that's stored in our database. 

###Policies

Policies are sails way of determining whether a request is allowed or not. There are 2 parts to this: the api side and the routing configuration. In the api/policies directory, we add a new policy for checking a user's token. The hasToken policy uses [express-jwt](https://www.npmjs.org/package/express-jwt) to check the validity of the token and parse it into the user object we passed jwt earlier. For the jwt token authorization to work, the request must have a header called **Authorization** with a value of **Bearer <token>**. JWT uses bearer tokens and will take the token from this header and if it is valid, allow the request through while setting the req.user variable

The second part of policies is in config/policies. This is where we define which routes need to pass which policies. For this app, we want every request to go through the token policy except for user registration (which sails creates for us when we make our user model, and is defined with create) and the authentication controller (for logging in). 

###Routes

Routes are how we define where sails sends our extra request. They are defined in config/routes. We want to tell sails to forward our /login post requests to AuthControler.login and /logout get requests to AuthController.logout

###Cors

Sails allows us to set up how we handle cors requests. It is in config/cors. Since we are on a different server, we need to allow these requests. So, I set allRoutes to true, allowing all requests from other domains. Since we are also using and Authorization header in our requests, we need to add **authorization** to the **headers** object. This tells the server to allow the Authorization header on cors requests.

###Adapters

Sails uses an dirty database to store objects by default. I'd rather use mongo to store my objects. Luckily, sails uses a waterline connector allowing us to plug in any database we want. By installing [sails-mongo](https://www.npmjs.org/package/sails-mongo) and changing the settings in config/adapters we can very easily setup sails to use a mongo database. 

And Thats it
=====================

This token based authentication system will allow us to use the api that sails builds for us to it's full extent without having to let us rely on sessions to stay authenticated. We can now keep user's authenticated across multiple devices over a long period of time. 








