(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.contacto', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/contacto', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'ContactoController',
                data: {requiresLogin:false}
            });
        }])
        .controller('ContactoController', ContactoController);


    ContactoController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function ContactoController(LoginService, LoginState, store, $location) {

        var vm = this;


    }
})();