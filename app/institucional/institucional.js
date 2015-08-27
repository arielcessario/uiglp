(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.institucional', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/institucional', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'InstitucionalController',
                data: {requiresLogin:true}
            });
        }])
        .controller('InstitucionalController', InstitucionalController);


    InstitucionalController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function InstitucionalController(LoginService, LoginState, store, $location) {

        var vm = this;


    }
})();