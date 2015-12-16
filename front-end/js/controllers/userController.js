angular
  .module('CampSocial')
  .controller('userController', userController);

userController.$inject=['User']
function userController(User){
  var self = this
  self.users= User.query();
  self.greeting = "Hello"

}

