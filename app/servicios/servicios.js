(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.servicios', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/servicios', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'ServiciosController',
                data: {requiresLogin:false}
            });
        }])
        .controller('ServiciosController', ServiciosController);


    ServiciosController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function ServiciosController(LoginService, LoginState, store, $location) {

        var vm = this;


    }
})();