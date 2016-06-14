'use strict';

/**
 * @ngdoc overview
 * @name tvdApp
 * @description
 * # tvdApp
 *
 * Main module of the application.
 */
angular.module('myApp', [
    'ui.router',
	'googleBot',
])
.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
	

	
	// Routes
	$stateProvider
		.state('home', {
			url: '/',
			template: '<div></div>'
		})
		.state('notifications', {
			url: '^/notifications',
			template: '<div><h1>Notifications</h1><p>List of notifications is empty.</p><small>This is your default view</small><button ui-sref="messages()">Next</button></div>',
		})
		.state('messages', {
			url: '^/messages',
			template: '<div><h1>Messages</h1><p>You have no new messages</p><small>This is substate</small><button ui-sref="notifications()">Prev</button></div>',
		});

}])
.run(['$window', '$rootScope', '$state', '$stateParams', 'gBot', function($window, $rootScope, $state, $stateParams, gBot) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	

	$state.previous = $state.current;
	$state.previous.params = $stateParams; 
	


	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

		
		if(gBot.isActive(event)) return;
		else if (toState.name === 'home') {
			event.preventDefault();
			$state.go('notifications');
			return;
		}
		
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	  $state.previous = fromState;
	  $state.previous.params = fromParams;
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		event.preventDefault();
		console.log(error);
	});
	
	


}]);
  

angular.element(document).ready(function () {
	
	angular.bootstrap(document, ['myApp']);
});