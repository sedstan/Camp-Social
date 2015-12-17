angular
.module('CampSocial')
.controller('homeController', homeController);

homeController.$inject=['User', 'TokenService', '$state', 'CurrentUser']
function homeController (User,TokenService, $state, CurrentUser) {
  // Screen is loaded
//If user is not loggedin, flash error message.
// Show Login Form(not yet written)

  if(!CurrentUser)
}