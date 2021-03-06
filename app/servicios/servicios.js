(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.servicios', ['ngRoute', ['utils/utils.min.js']])
        .config(['$routeProvider', function ($routeProvider) {
            //$routeProvider.when('/servicios', {
            //    templateUrl: currentScriptPath.replace('.js', '.html'),
            //    controller: 'ServiciosController',
            //    data: {requiresLogin:false}
            //});
        }])
        .controller('ServiciosController', ServiciosController);


    ServiciosController.$inject = ['LoginService', 'LoginState', '$timeout', '$http', 'AcUtilsService'];
    function ServiciosController(LoginService, LoginState, $timeout, $http, AcUtilsService) {

        var vm = this;
        vm.email = '';
        vm.mensaje= '';
        vm.enviarMail = enviarMail;
        vm.enviando = false;


        function enviarMail(){
            vm.enviando = true;
            var conErrores = false;
            if (vm.email == undefined || vm.email.trim().length == 0 || !AcUtilsService.validateEmail(vm.email)) {
                AcUtilsService.validations('servicio-contacto-mail', 'El mail no es válido');
                conErrores = true;
            }

            if (vm.nombre == undefined || vm.nombre.trim().length == 0) {
                AcUtilsService.validations('servicio-contacto-nombre', 'Debe ingrear su nombre');
                conErrores = true;
            }

            if (vm.mensaje == undefined || vm.mensaje.trim().length == 0) {
                AcUtilsService.validations('servicio-contacto-mensaje', 'Debe ingresar un mensaje');
                conErrores = true;
            }

            if (vm.asunto == undefined || vm.asunto.trim().length == 0) {
                AcUtilsService.validations('servicio-contacto-asunto', 'Debe ingresar un asunto');
                conErrores = true;
            }

            if (conErrores) {
                return;
            }
            //vm.enviado = true;
            //$timeout(hideMessage, 3000);
            //function hideMessage() {
            //    vm.enviado = false;
            //}

            //console.log(vm.mail);
            return $http.post('./servicios/contact.php',
                {'email': vm.email, 'nombre': vm.nombre, 'mensaje': vm.mensaje, 'asunto': vm.asunto})
                .success(
                    function (data) {
                        vm.enviado = true;
                        vm.enviando = false;
                        $timeout(hideMessage, 3000);
                        function hideMessage() {
                            vm.enviado = false;
                        }

                        vm.email = '';
                        vm.nombre = '';
                        vm.mensaje = '';
                        vm.asunto = '';

                        //goog_report_conversion('http://www.ac-desarrollos.com/#');
                    })
                .error(function (data) {
                    console.log(data);
                });
        }


    }
})();