var app = angular.module("todoRename", ['ngRoute', 'directive.g+signin']);

//We use hashbangs here, not your terrible html5 urls
app.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}]);



app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'template/landing.html',
		controller: 'LandingController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

app.directive('redditHeadline', function() {
	return {
		restrict: 'A',
		//scope: {item: '=redditHeadline'},
		templateUrl: 'template/redditHeadline.html',
		//template: "<p>{{post.data.title}}</p>"
		link: function(scope, ele, attrs, con){
			scope.image = (scope.post.data.thumbnail != "" && scope.post.data.thumbnail != "self");
		},
	};
});


//Can provide reddit
app.factory('RedditService', ['$http', '$q', function($http, $q) {
	var service = {}
	var data = {posts: undefined};
	//We return data, which contains nothing but articles
	//This is so when the articles change, things are still bound to data

	service.reload = function(){
		var defer = $q.defer();
		$http.get('https://www.reddit.com/.json')
			.then(
				function(response){
					data.posts = response.data.data.children;
					defer.resolve(data);
				},
				function(error){
					defer.reject(error);
				}
			);
		return defer.promise;
	};


	return service;
}]);

// http://stackoverflow.com/a/12506795/2423187
app.factory('Page', function(){
	var title = 'todo: Rename';
	var appName = 'TODO: Rename';
	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle; },

		appName: function() { return appName; },
		setAppName: function(newName) { appName = newName; },
	};
});

app.controller('MainController', ['$scope', 'Page',
		function($scope, Page) {
	$scope.Page = Page;
	$scope.$on('event:google-plus-signin-success', function (event,authResult) {
		console.log(authResult);
		// Send login to server or save into cookie
		var profile = authResult.getBasicProfile();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		//ID token: authResult.getAuthResponse().id_token https://developers.google.com/identity/sign-in/web/backend-auth
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
	});
	$scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		console.log("Google sign in failed");
	});
}]);
app.controller('LandingController', ['$scope', 'RedditService',
		function($scope, reddit) {
}]);


function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}

