(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.ingreso', ['ngRoute', 'login.login'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/ingreso', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'IngresoController'
            });
        }])
        .controller('IngresoController', IngresoController);


    IngresoController.$inject = ['LoginService', 'LoginState', 'store', '$location'];
    function IngresoController(LoginService, LoginState, store, $location) {

        var vm = this;
        vm.login = login;
        vm.mail = '';
        vm.password = '';

        if(LoginState.isLogged){
            $location.path('/administracion');
        }

        function login(){
            LoginService.login(vm.mail, vm.password, function(data){

                if(data != -1){
                    LoginState.isLogged = true;
                    store.set('jwt', data);
                }else{
                    LoginState.isLogged = false;
                }
            });
        }

    }
})();