(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.nuevoUsuario', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/nuevo_usuario', {
                templateUrl: currentScriptPath.replace('.min.js', '.html'),
                controller: 'NuevoUsuarioController',
                data: {requiresLogin: false}
            });
        }])
        .controller('NuevoUsuarioController', NuevoUsuarioController);


    NuevoUsuarioController.$inject = ['LoginService', 'LoginState', 'store', '$location', 'AcUtilsService'];
    function NuevoUsuarioController(LoginService, LoginState, store, $location, AcUtilsService) {

        var vm = this;

        vm.usuario = {
            cliente_id: -1,
            nombre: '',
            apellido: '',
            nro_doc: '',
            telefono: '',
            password: '',
            direccion: '',
            mail: '',
            rol_id: 0
        };

        vm.saveUsuario = saveUsuario;


        function saveUsuario() {

            var conErrores = false;

            if (vm.usuario.nombre.trim().length == 0) {
               AcUtilsService.validations('nombre', 'El nombre es obligatorio');
                conErrores = true;
            }

            if (vm.usuario.apellido.trim().length == 0) {
                AcUtilsService.validations('apellido', 'El apellido es obligatorio');
                conErrores = true;
            }

            if (vm.usuario.nro_doc.trim().length == 0) {
                AcUtilsService.validations('cuit', 'El CUIT es obligatorio');
                conErrores = true;
            }

            if (vm.usuario.telefono.trim().length == 0) {
                AcUtilsService.validations('telefono', 'El teléfono es obligatorio');
                conErrores = true;
            }
            if (vm.usuario.password.trim().length == 0) {
                AcUtilsService.validations('password', 'El password es obligatorio');
                conErrores = true;
            }
            if (vm.usuario.direccion.trim().length == 0) {
                AcUtilsService.validations('direccion', 'La dirección es obligatoria');
                conErrores = true;
            }

            if (!AcUtilsService.validateEmail(vm.usuario.mail)) {
                AcUtilsService.validations('email', 'El mail es incorrecto');
                conErrores = true;
            }

            if(conErrores){
                return;
            }
            LoginService.existeCliente(vm.usuario.mail, function(data){

                if(data == 'true'){
                    AcUtilsService.validations('email', 'El usuario ya existe');
                }else{
                    LoginService.create(vm.usuario, function (data) {

                        if(data == 'true'){
                            LoginService.login(vm.usuario.mail, vm.usuario.password,function(data){
                                if(data != -1){
                                    LoginState.isLogged = true;
                                    store.set('jwt', data);
                                    $location.path('/administracion');
                                }else{
                                    LoginState.isLogged = false;
                                }
                            });

                        }
                    });
                }
            });


        }

    }
})();