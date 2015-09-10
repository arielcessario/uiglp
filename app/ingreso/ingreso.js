(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script")
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.ingreso', ['ngRoute', 'login.login'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/ingreso', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'IngresoController',
                data: {requiresLogin: false}
            });
        }])
        .controller('IngresoController', IngresoController);


    IngresoController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'AcUtilsService'];
    function IngresoController(LoginService, LoginState, store, $location, AcUtilsService) {

        var vm = this;
        vm.login = login;
        vm.nuevoUsuario = nuevoUsuario;
        vm.recuperarPassword = recuperarPassword;
        vm.mail = '';
        vm.password = '';

        if (store.get('jwt')) {
            $location.path('/administracion');
        }


        function recuperarPassword() {
            if (!AcUtilsService.validateEmail(vm.mail)) {
                AcUtilsService.validations('mail', 'El mail es incorrecto');
                return;
            }
            LoginService.forgotPassword(vm.mail, function (data) {
                console.log(data);
            });
        }

        function nuevoUsuario() {
            $location.path('/nuevo_usuario');
        }

        function login() {
            var conErrores = false;

            if (vm.password.trim().length == 0) {
                AcUtilsService.validations('password', 'El password es obligatorio');
                conErrores = true;
            }

            if (!AcUtilsService.validateEmail(vm.mail)) {
                AcUtilsService.validations('mail', 'El mail es incorrecto');
                conErrores = true;
            }

            if (conErrores) {
                return;
            }

            LoginService.login(vm.mail, vm.password, function (data) {

                if (data != -1) {
                    LoginState.isLogged = true;
                    store.set('jwt', data);
                    $location.path('/administracion');
                } else {
                    LoginState.isLogged = false;
                    AcUtilsService.validations('password', 'Mail o password incorrectos');
                }
            });
        }

    }
})();