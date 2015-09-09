(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.revistas', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/revistas', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'RevistasController',
                data: {requiresLogin:false}
            });
        }])
        .controller('RevistasController', RevistasController);


    RevistasController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function RevistasController(LoginService, LoginState, store, $location) {

        var vm = this;


    }
})();