'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', [
    'ngRoute',
    'ngAnimate',
    'angular-storage',
    'angular-jwt',
    'login.login',
    'acRipple',
    'acUtils',
    'ac.noticias',
    'slider.manager',
    'uiglp.main',
    'uiglp.ingreso',
    'uiglp.administracion',
    'uiglp.institucional',
    'uiglp.nuevoUsuario',
    'uiglp.noticias',
    'ofertasLaborales',
    'uiglp.busquedasLaborales',
    'uiglp.servicios',
    'uiglp.revistas',
    'uiglp.contacto'

]).
    config(['$routeProvider', 'jwtInterceptorProvider', '$httpProvider',
        function ($routeProvider, jwtInterceptorProvider, $httpProvider) {
            jwtInterceptorProvider.tokenGetter = function (store) {
                return store.get('jwt');
            };
            $httpProvider.interceptors.push('jwtInterceptor');
        }])
    .run(function ($rootScope, store, jwtHelper, $location, LinksService) {
        $rootScope.$on('$routeChangeStart', function (e, to) {




            if(store.get('jwt')){
                LinksService.links = [
                    {nombre: 'INICIO', path: '/'},
                    {nombre: 'INSTITUCIONAL', path: '/institucional'},
                    {nombre: 'BUSQUEDA LABORAL', path: '/busquedas_laborales'},
                    {nombre: 'NOTICIAS', path: '/noticias/0'},
                    {nombre: 'CONTACTO', path: '/contacto'},
                    {nombre: 'REVISTA', path: '/revistas'},
                    {nombre: 'MI CUENTA', path: '/ingreso'}
                ];

                $rootScope.$broadcast('links');
            }else{
                LinksService.links = [
                    {nombre: 'INICIO', path: '/'},
                    {nombre: 'INSTITUCIONAL', path: '/institucional'},
                    {nombre: 'BUSQUEDA LABORAL', path: '/busquedas_laborales'},
                    {nombre: 'NOTICIAS', path: '/noticias/0'},
                    {nombre: 'CONTACTO', path: '/contacto'},
                    {nombre: 'REVISTA', path: '/revistas'},
                    {nombre: 'INGRESO', path: '/ingreso'}
                ];

                $rootScope.$broadcast('links');
            }


            if (to && to.data && to.data.requiresLogin) {
                //if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                if (!store.get('jwt')) {
                    e.preventDefault();
                    $location.path('/ingreso');
                }
            }
        });
    })
    .service('LinksService', LinksService)
    .controller('AppController', AppController);


function LinksService(){
    this.links = [
        {nombre: 'INICIO', path: '/'},
        {nombre: 'INSTITUCIONAL', path: '/institucional'},
        {nombre: 'BUSQUEDA LABORAL', path: '/busquedas_laborales'},
        {nombre: 'NOTICIAS', path: '/noticias/0'},
        {nombre: 'CONTACTO', path: '/contacto'},
        {nombre: 'REVISTA', path: '/revistas'},
        {nombre: 'INGRESO', path: '/ingreso'}
    ];
}



AppController.$inject = ['LoginService', '$location', '$rootScope', '$scope', 'LinksService'];
function AppController(LoginState, $location, $rootScope, $scope, LinksService) {

    var vm = this;
    vm.goTo = goTo;
    vm.selectedPage = 'INICIO';
    vm.menu_mobile_open = false;
    vm.links = LinksService.links;

    $scope.$on('links', function(event, args) {
        vm.links = LinksService.links;
    });


    //store.remove('jwt');


    for(var i = 0; i<vm.links.length;i++){
        if(vm.links[i].path == $location.$$path){
             vm.selectedPage = vm.links[i].nombre;
         }

        if ($location.$$path == '/administracion') {
            vm.selectedPage = 'INGRESO';
        }

        if ($location.$$path == '/servicios') {
            vm.selectedPage = 'INICIO';
        }

        if ($location.$$path == '/nuevo_usuario') {
            vm.selectedPage = 'INGRESO';
        }

        if ($location.$$path.indexOf('/noticias') > -1) {
            //response = '/' + $location.$$path.split('/')[1];
            vm.selectedPage = 'NOTICIAS';
        }

    }







    //console.log(vm.selectedPage);

    //$rootScope.$on("$routeChangeStart", function (event, next, current) {
    //
    //
    //    if (next.$$route.originalPath !== '/ingreso' && !LoginState.isLogged) {
    //        $location.path('/ingreso');
    //    }
    //});



    function goTo(location) {

        $location.path(location.path);

        vm.selectedPage = location.nombre;



    }
}
