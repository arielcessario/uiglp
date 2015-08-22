'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', [
    'ngRoute',
    'uiglp.main'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
    }])
    .controller('MainController', MainController);


MainController.$inject = [];
function MainController() {

    var vm = this;
    vm.links = [
        {nombre: 'INICIO', path: ''},
        {nombre: 'INSTITUCIONAL', path: ''},
        {nombre: 'BUSQUEDA LABORAL', path: ''},
        {nombre: 'AGENDA', path: ''},
        {nombre: 'CONTACTO', path: ''},
        {nombre: 'REVISTA', path: ''}
    ];

}
