angular
.module('CampSocial')
.controller('userController', userController);
userController.$inject=['User', 'TokenService', '$state', 'CurrentUser']
function userController(User, TokenService, $state,  CurrentUser){
  var self = this
  self.all= User.query();
  self.user          = {};
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  self.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

    // GETs all the users from the api
    function getUsers() {
      User.query(function(data){
       return self.all = data.users;
     });
    }

    // Actions to carry once register or login forms have been submitted
    function handleLogin(res) {
      var token = res.token ? res.token : null;
      if (token) {
        self.getUsers();
        $state.go('users');
      }
      // console.log(res);
      self.user = TokenService.decodeToken();
      CurrentUser.saveUser(self.user)
    }

    // POSTS the new user to register to the API
    function register() {
      User.register(self.user, handleLogin);
    }

    // POSTS the new user to login to the API
    function login() {
      User.login(self.user, handleLogin);
    }

    // A function to remove token form local storage and log user out
    function logout() {
      TokenService.removeToken();
      self.all  = [];
      self.user = {};
      CurrentUser.clearUser();
    }

    // Checks if the user is logged in
    function checkLoggedIn() {
      var loggedIn = !!TokenService.getToken();
      return loggedIn;
    }

    // Checks if the user is logged in, runs every time the page is loaded
    if (CurrentUser.getUser()) {
      self.getUsers();
      // self.user = TokenService.decodeToken();
      // console.log(self.user);
    }

    return self
  }

