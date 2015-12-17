angular
.module('CampSocial')
.controller("campsitesController", campsitesController);

campsitesController.$inject = ["Campsite", "User", "CurrentUser", "$state"]
function campsitesController(Campsite, User, CurrentUser, $state){
  var self = this; 

  self.user = CurrentUser.getUser()
  console.log(self.user._id)
  if (!CurrentUser.getUser()._id) {
    return $state.go("home");
  }

  self.all     = [];
  self.users   = [];
  self.campsite = {}; 

  self.getCampsites = function(){
    Campsite.query(function(data){
      return self.all = data;
      console.log(data)
    })
  }

  // self.getUsers = function(){
  //    User.query(function(data){
  //     return self.users = data.users;
  //   });
  // }

  self.add = function(){
    var campsite = { campsite: self.campsite }
    Campsite.save(campsite, function(data){
      self.all.push(data);
      self.campsite = {};
    })
  }

  self.getCampsites();
return self
  
}