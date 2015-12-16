angular
  .module('CampSocial')
  .service('CurrentUser', CurrentUser);

CurrentUser.$inject = ["TokenService"]
function CurrentUser(TokenService){

  var self  = this;
  self.user = {} 

  self.saveUser = function(user){
    self.user = user
  }

  self.getUser = function(){
    return self.user;
  }

  self.clearUser = function(){
    return self.user = {};
  }

}