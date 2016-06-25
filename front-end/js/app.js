angular
  .module('CampSocial', ['ngResource','angular-jwt','ui.router','ui.bootstrap'])
  .constant('API', 'http://localhost:3000/api')
  .config(authInterceptor)
  .config(mainRouter)

function authInterceptor($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}

function mainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('home', {
          url:"/",
          templateUrl: "js/views/home.html"


        })
        .state('profile', {
          url: "/profile",
          templateUrl: "js/views/profile.html",
          controller: 'usersController as users'
        })
        .state('campsites', {
          url: '/campsites',
          templateUrl:  "js/views/campsitesIndex.html",
          controller: "campsitesController as campsites"
        })
        .state('register', {
          url: '/register',
          templateUrl:  "js/views/register.html"
        })



      $urlRouterProvider.otherwise("/profile");
}
