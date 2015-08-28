'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', [
    'ngRoute',
    'ngAnimate',
    'angular-storage',
    'angular-jwt',
    'login.login',
    'acRipple',
    'uiglp.main',
    'uiglp.ingreso',
    'uiglp.administracion',
    'uiglp.institucional',
    'uiglp.nuevoUsuario',
    'ofertasLaborales'
]).
    config(['$routeProvider', 'jwtInterceptorProvider', '$httpProvider',
        function ($routeProvider, jwtInterceptorProvider, $httpProvider) {
            jwtInterceptorProvider.tokenGetter = function (store) {
                return store.get('jwt');
            };
            $httpProvider.interceptors.push('jwtInterceptor');
        }])
    .run(function ($rootScope, store, jwtHelper, $location) {
        $rootScope.$on('$routeChangeStart', function (e, to) {

            //console.log(to.data);
            //if (!store.get('jwt')) {
            //    console.log('data');
            //}


            if (to && to.data && to.data.requiresLogin) {
                //if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                if (!store.get('jwt')) {
                    e.preventDefault();
                    $location.path('/ingreso');
                }
            }
        });
    })
    .controller('AppController', AppController);


AppController.$inject = ['LoginService', '$location', '$rootScope'];
function AppController(LoginState, $location, $rootScope) {

    var vm = this;
    vm.goTo = goTo;
    vm.links = [
        {nombre: 'INICIO', path: '/'},
        {nombre: 'INSTITUCIONAL', path: '/institucional'},
        {nombre: 'BUSQUEDA LABORAL', path: '/busqueda'},
        {nombre: 'AGENDA', path: '/agenda'},
        {nombre: 'CONTACTO', path: '/contacto'},
        {nombre: 'REVISTA', path: '/revista'},
        {nombre: 'INGRESO', path: '/ingreso'}
    ];


    //$rootScope.$on("$routeChangeStart", function (event, next, current) {
    //
    //
    //    if (next.$$route.originalPath !== '/ingreso' && !LoginState.isLogged) {
    //        $location.path('/ingreso');
    //    }
    //});

    function goTo(location) {

        $location.path(location);
    }
}
