angular
.module('CampSocial')
.factory('Campsite', Campsite)

Campsite.$inject =['$resource', 'API']

function Campsite($resource, API){

  return $resource(
    API+'/campsites/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}
