# angular-gBot
AngularJS directive for Googlebot integration

#Requirements
 angular (tested on Angular v1.3.14)  
 angular-ui/ui-router (tested on v0.2.13)

#Usage
 Use this service if you're using Ajax-based url. This version doesn't support HTML5 mode, so if you're not using hashtag, wait for newer version. 
 This service detects if Googlebot is crawling the page. It searches through all states, finds the right one and redirects to it.  
 
 Note: You must enable hashprefix in order to comply with Google standards ( .config([...]){ $locationProvider.hashPrefix('!'); }))  
 
 1.) Change first line of javascript to comply with your format of the app.
 2.) Add service name (gBot) where you run the app and initiate it on "$stateChangeStart" event. The skeleton would look like this:
 
 .run(['$window', '$rootScope', '$state', '$stateParams', 'gBot', function($window, $rootScope, $state, $stateParams, gBot) {  
 /*** some code ***/  
 
   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {  
     if(gBot.isActive(event)) return;  
   });  
 
 }]);
