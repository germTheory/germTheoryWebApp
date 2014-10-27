
# Angular and Single Page Applications (SPA)

##What exactly is Angular?
* An open source framework maintained by Google and the community. Angular tries to make it easy to build single page applications by taking a very opinionated approach compared to other MVC's such as Backbone.

### Things convered in the sprint
* Controllers & $scope
* Modules
* Routing & multiple views
* Factories & Services
* Directives
* Promises
* Filters
* Testing with Karma

## What is a SPA?
* A single page application varies differently than a traditional web app. The server does not render any views, it only serves the index.html, static assets, and maybe act as a RESTFUL JSON API. Once the index.html is loaded, all templating and routing is handled by front-end javaScript frameworks like Angular.

## Token based authentication
* Instead of using sessions and having our server keep track of the current user, this server uses tokens. To be exact, JSON web tokens or JWT, pronounced jot. The client stores the token and must send the token on every request that wants access to a protected endpoint. The server knows nothing of the current users. 

## Mongo
* Mongo is a No-SQL database. It does not require schemas and was built entirely in JavaScript. This server uses Mongo and an ORM called Mongoose, instead of Bookshelf and sql-lite.

## Gulp
* Gulp is a task runner that will make your life easier. So easy. You just tell it what to do, and it'll do it. For this repo, Gulp will start your node server with nodemon, it will also watch for any changes to your client side files and refresh the browser automagically for you using browser-sync (you may have to manually refresh the browser the first time browser-sync launches). To learn more, look at the material list below and read the comments in `Gulpfile.js`

##Express architecture
* Version 4 removes almost all dependencies on `connect`. Which means you'll have to manually install popular middleware like `body-parser`. Also, Express 4 introduces mini-routers, allowing us to have separate configurations mapping to different routes. Check out how the server is organized and read the comments in `server/server.js` to get a feel for it.

## Reference material:
* [Getting started with Angular series](http://www.ng-newsletter.com/posts/beginner2expert-how_to_start.html)
* [Angular form validation](http://scotch.io/tutorials/javascript/angularjs-form-validation)
* [Intro to Gulp](http://closurelog.com/getting-started-gulp/)
* [What is JWT](http://www.sitepoint.com/using-json-web-tokens-node-js/)
* [Cookies vs JWT in Angular](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
* [Factories & Services](http://stackoverflow.com/questions/14324451/angular-service-vs-angular-factory)
* [Routing with ngRoute](http://scotch.io/tutorials/javascript/single-page-apps-with-angularjs-routing-and-templating)
* [What's new in Express 4](http://closurelog.com/whats-new-express-4/)
* [e2e testing with Protractor](http://www.ng-newsletter.com/posts/practical-protractor.html)


## What's in this repo?
* Express 4 sever
  - Connected to MongoDB using Mongoose
  - removal of EJS templating and sessions
  - JWT for authentication
  
* Gulpfile
  - instructions for all your tasks

* Skeleton app
  - All the files and folders needed for your angular app is there

* Client test

## Installing dependencies and Getting started
* [ ] run `npm install -g gulp karma karma-cli nodemon` global modules
* [ ] run `npm install` all node dependencies are listed in the package.json
* [ ] run `bower install` all client dependencies are listed in the bower.json
* [ ] in separate tab in your terminal run `mongod` to start mongo up
* [ ] run `gulp` to start our server and app
* [ ] run `gulp karma` to run all your test

## Your Goals

### Basic requirements:
- Tests
  + to run test use `gulp test` in your terminal
  * [ ] Build out LinksController and template
  * [ ] Build out ShortenController and template
  * [ ] Build out Links service
  * [ ] Add routing for both Links and Shorten templates

- Create a basic shortly app
  * [ ] Enable navigation between the links view and shorten view
  * [ ] Default to links view if an unknown route is attempted

- Validations
  * [ ] Validate the shorten links form before it submits to the server.
  * [ ] Validate sign up and sing in forms before it submits to the server.
  * [ ] Show errors when forms are invalid 

- Sorting and filtering:
  * [ ] Display the links on the listing page sorted by visit count
  * [ ] Add a live-search box that displays only the links that match the search criteria 

### Extra Credit:
- Look & Feel
  * [ ] Upgrade your UI and style with a CSS library
  * [ ] Add animations to views & elements with [ngAnimate](https://docs.angularjs.org/api/ngAnimate) and [ng-Fx](https://github.com/Hendrixer/ng-Fx)

- Widgets
  * [ ] Use a custom directive to display your links. ex: `<shortend-link> </shortened-link>`

- Routing 
  * [ ] Strip out ngRoute and use [ui-router](https://github.com/angular-ui/ui-router) . ui-router is the standard. The angular team did not create ui-router but it is better in many ways compared to ngRoute. The biggest advantage is the ability to have multiple and nested views.

- Testing
  * Create e2e test using Protractor

### Nightmare Mode
- Views
  * [ ] create a detailed stats view for each of your links
  * [ ] display a d3 graph that shows the link's stats

- UI
  * [ ] Look up [WebComponents and Polymer](http://www.polymer-project.org/docs/start/tutorial/intro.html)
  * [ ] Incorporate [Polymer Paper elements](http://www.polymer-project.org/docs/elements/) into your UI or create your own.
  
- Feature
  * [ ] Allow users to sign in with github using passport with JWTs.
  * [ ] Create a relationship between links and users with the mongoose schemas
  * [ ] Links view should only fetch links for the current signed in user, not all links
