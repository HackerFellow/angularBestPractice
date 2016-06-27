Best practice idea:
(Code does not follow)

routing resolve: http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
config functions: https://github.com/johnpapa/angular-styleguide/tree/master/a1#style-y090

Avoid $scope, use controllerAs directive to do controller.var instead of var, and set $scope.var in controller


use Immediately Invoked Function Expression (IIFE).
https://github.com/johnpapa/angular-styleguide/tree/master/a1#style-y010

https://scotch.io/tutorials/angularjs-best-practices-directory-structure

"The app.module.js file will handle the setup of your app, load in AngularJS dependencies and so on. The app.route.js file will handle all the routes and the route configuration"

Sample layout
	app/
	----- shared/   // acts as reusable components or partials of our site
	---------- sidebar/
	--------------- sidebarDirective.js
	--------------- sidebarView.html
	---------- article/
	--------------- articleDirective.js
	--------------- articleView.html
	----- components/   // each component is treated as a mini Angular app
	---------- home/
	--------------- homeController.js
	--------------- homeService.js
	--------------- homeView.html
	---------- blog/
	--------------- blogController.js
	--------------- blogService.js
	--------------- blogView.html
	----- app.module.js
	----- app.routes.js
	assets/
	----- img/      // Images and icons for your app
	----- css/      // All styles and style related files (SCSS or LESS files)
	----- js/       // JavaScript files written for your app that are not for angular
	----- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
	index.html
	

Maybe useful example: https://github.com/Thinkful/guide-intro-to-angular (bad layout though)
