'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', [
  'ngRoute',
    'uiglp.main'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);
