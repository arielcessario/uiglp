'use strict';

// Declare app level module which depends on views, and components
angular.module('uiglp', ['oc.lazyLoad',
    'ngRoute',
    'ngAnimate',
    'angular-storage',
    'angular-jwt',
    'login.login',
    //'acRipple',
    //'acUtils',
    'ac.noticias',
    'slider.manager',
    //'uiglp.main',
    //'uiglp.ingreso',
    //'uiglp.administracion',
    //'uiglp.institucional',
    //'uiglp.nuevoUsuario',
    //'uiglp.noticias',
    //'ofertasLaborales',
    //'uiglp.busquedasLaborales',
    //'uiglp.servicios',
    //'uiglp.revistas',
    //'uiglp.contacto'

]).
    config(['$routeProvider', 'jwtInterceptorProvider', '$httpProvider', '$ocLazyLoadProvider',
        function ($routeProvider, jwtInterceptorProvider, $httpProvider, $ocLazyLoadProvider) {


            //$ocLazyLoadProvider.config({
            //    modules: [{
            //        name: 'ofertasLaborales',
            //        files: ['ofertas_laborales/ofertas_laborales.min.js']
            //    }]
            //});



            jwtInterceptorProvider.tokenGetter = function (store) {
                return store.get('jwt');

            };
            $httpProvider.interceptors.push('jwtInterceptor');


            $routeProvider.when('/revistas', {
                templateUrl: 'revistas/revistas.html',
                controller: 'RevistasController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('revistas/revistas.min.js');
                    }]
                }
            });

            $routeProvider.when('/', {
                templateUrl: 'main/main.html',
                controllerAs: 'mainCtrl',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('main/main.min.js');
                    }]
                }
            });


            $routeProvider.when('/ingreso', {
                templateUrl: 'ingreso/ingreso.html',
                controller: 'IngresoController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('ingreso/ingreso.min.js');
                    }]
                }
            });

            $routeProvider.when('/administracion', {
                templateUrl: 'administracion/administracion.html',
                controller: 'AdministracionController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('administracion/administracion.min.js');
                    }]
                }
            });


            $routeProvider.when('/nuevo_usuario', {
                templateUrl: 'nuevo_usuario/nuevo_usuario.html',
                controller: 'NuevoUsuarioController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('nuevo_usuario/nuevo_usuario.min.js');
                    }]
                }
            });

            $routeProvider.when('/contacto', {
                templateUrl: 'contacto/contacto.html',
                controller: 'ContactoController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('contacto/contacto.min.js');
                    }]
                }
            });


            $routeProvider.when('/institucional', {
                templateUrl: 'institucional/institucional.html',
                controller: 'InstitucionalController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('institucional/institucional.min.js');
                    }]
                }
            });


            $routeProvider.when('/busquedas_laborales', {
                templateUrl: 'busquedas_laborales/busquedas_laborales.html',
                controller: 'BusquedasLaboralesController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('busquedas_laborales/busquedas_laborales.min.js');
                    }]
                }
            });

            $routeProvider.when('/servicios', {
                templateUrl: 'servicios/servicios.html',
                controller: 'ServiciosController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('servicios/servicios.min.js');
                    }]
                }
            });

            $routeProvider.when('/noticias/:id', {
                templateUrl: 'noticias/noticias.html',
                controller: 'NoticiasController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('noticias/noticias.js');
                    }]
                }
            });
        }])
    .run(function ($rootScope, store, jwtHelper, $location, LinksService) {
        $rootScope.$on('$routeChangeStart', function (e, to) {


            if (store.get('jwt')) {
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
            } else {
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


function LinksService() {
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


AppController.$inject = ['LoginService', '$location', '$rootScope', '$scope', 'LinksService', '$ocLazyLoad', 'store'];
function AppController(LoginState, $location, $rootScope, $scope, LinksService, $ocLazyLoad, store) {

    //store.remove('jwt');
    var vm = this;
    vm.goTo = goTo;
    vm.selectedPage = 'INICIO';
    vm.menu_mobile_open = false;
    vm.links = LinksService.links;

    $scope.$on('links', function (event, args) {
        vm.links = LinksService.links;
    });


    //store.remove('jwt');




    for (var i = 0; i < vm.links.length; i++) {
        if (vm.links[i].path == $location.$$path) {
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
