angular
  .module('CampSocial', ['ngResource','angular-jwt','ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(authInterceptor)
  .config(mainRouter)

function authInterceptor($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}

function mainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('users', {
          url: "/users",
          templateUrl: "js/views/usersIndex.html"
        })
        .state('campsites', {
          url: '/campsites',
          templateUrl:  "js/views/campsitesIndex.html",
          controller: "campsitesController as campsites"
        })

      $urlRouterProvider.otherwise("/");
}
