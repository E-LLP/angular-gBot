# angular-gBot
AngularJS directive for Googlebot integration

#Requirements
 angular (tested on Angular v1.3.14)  
 angular-ui/ui-router (tested on v0.2.13)

#Usage
 Use this service if you're using Ajax-based url. This version doesn't support HTML5 mode, so if you're not using hashtag, wait for newer version. 
 This service detects if Googlebot is crawling the page. It searches through all states, finds the right one and redirects to it.  
 
 Note: You must enable hashprefix in order to comply with Google standards ( .config([...]){ $locationProvider.hashPrefix('!'); }))  
and don't forget to put fragment meta tag: <meta name="fragment" content="!">  
   
 1.) Include "googleBot" as a dependancy in your Angular application   
 2.) Add service name (gBot) where you run the app   
 3.) Service has one function, named "isActive(event)". If it returns true, than google crawler has been detected and state change has already been initialized. 
 All you need to do, is stop the original "$stateChangeStart" event  
  
-take a look at example: app.js file  
  
#Testing
Google crawler changes hashtag into GET parameter "_escaped_fragment_". Convert your link accordingly, example:  
http://127.0.0.1/gBot/example/#!/messages  
becomes  
http://127.0.0.1/gBot/example/?_escaped_fragment_=/messages  
  
You should be redirected to substate instead of default.