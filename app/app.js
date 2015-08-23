'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', [
    'ngRoute',
    'login.login',
    'uiglp.main',
    'uiglp.ingreso',
    'uiglp.administracion'
]).
    config(['$routeProvider', function ($routeProvider) {
        //$routeProvider.otherwise({redirectTo: '/main'});
    }])
    .controller('MainController', MainController);


MainController.$inject = ['LoginService', '$location', '$rootScope'];
function MainController(LoginService, $location, $rootScope) {

    var vm = this;
    vm.goTo = goTo;
    vm.links = [
        {nombre: 'INICIO', path: '/'},
        {nombre: 'INSTITUCIONAL', path: '#/institucional'},
        {nombre: 'BUSQUEDA LABORAL', path: '#/busqueda'},
        {nombre: 'AGENDA', path: '#/agenda'},
        {nombre: 'CONTACTO', path: '#/contacto'},
        {nombre: 'REVISTA', path: '#/revista'},
        {nombre: 'INGRESO', path: '/ingreso'}
    ];


    $rootScope.$on("$routeChangeStart", function(event, next, current){


        if(next.$$route.originalPath== '/ingreso'){
            console.log(LoginService.checkLogged());
            if(!LoginService.checkLogged()){
                $location.path('/administracion');
            }
        }
    });

    function goTo(location){

        $location.path(location);
    }
}
