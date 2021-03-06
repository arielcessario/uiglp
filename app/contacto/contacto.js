(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.contacto', ['ngRoute', ['utils/utils.min.js']])
        .config(['$routeProvider', function ($routeProvider) {
            //$routeProvider.when('/contacto', {
            //    templateUrl: currentScriptPath.replace('.js', '.html'),
            //    controller: 'ContactoController',
            //    data: {requiresLogin: false}
            //});
        }])
        .controller('ContactoController', ContactoController)
        .factory('ContactoService', ContactoService);


    ContactoController.$inject = ['LoginService', 'LoginState', 'store', '$http', '$timeout', 'AcUtilsService'];
    function ContactoController(LoginService, LoginState, store, $http, $timeout, AcUtilsService) {

        var vm = this;
        vm.enviado = false;
        vm.sendMail = sendMail;


        fuckFacebook(document, 'script', 'facebook-jssdk');

        function fuckFacebook(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5";
            fjs.parentNode.insertBefore(js, fjs);


        };


        //function initialize() {
        //    var myLatLng = {lat: -34.9067806, lng: -57.9475211};
        //    var mapCanvas = document.getElementById('contacto-map');
        //    var mapOptions = {
        //        center: new google.maps.LatLng(-34.9067806, -57.9475211),
        //        zoom: 13,
        //        mapTypeId: google.maps.MapTypeId.ROADMAP
        //    };
        //    var map = new google.maps.Map(mapCanvas, mapOptions);
        //    var marker = new google.maps.Marker({
        //        position: myLatLng,
        //        map: map,
        //        title: 'UIGLP'
        //    });
        //}
        //
        //google.maps.event.addDomListener(window, 'load', initialize());


        function sendMail() {

            var conErrores = false;
            if (vm.email == undefined || vm.email.trim().length == 0 || !AcUtilsService.validateEmail(vm.email)) {
                AcUtilsService.validations('contacto-mail', 'El mail no es válido');
                conErrores = true;
            }

            if (vm.nombre == undefined || vm.nombre.trim().length == 0) {
                AcUtilsService.validations('contacto-nombre', 'Debe ingrear su nombre');
                conErrores = true;
            }

            if (vm.mensaje == undefined || vm.mensaje.trim().length == 0) {
                AcUtilsService.validations('contacto-consulta', 'Debe ingresar un mensaje');
                conErrores = true;
            }

            if (vm.asunto == undefined || vm.asunto.trim().length == 0) {
                AcUtilsService.validations('contacto-asunto', 'Debe ingresar un asunto');
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
            return $http.post('./contacto/contact.php',
                {'email': vm.email, 'nombre': vm.nombre, 'mensaje': vm.mensaje, 'asunto': vm.asunto})
                .success(
                    function (data) {
                        console.log(data);
                        vm.enviado = true;
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

    ContactoService.$inject = ['$http'];
    function ContactoService($http) {

        var service = this;
        service.sendMail = sendMail;

        return service;

        function sendMail(email, nombre, mensaje, asunto, callback) {

            //console.log(vm.mail);
            return $http.post('./contacto/contact.php',
                {'email': email, 'nombre': nombre, 'mensaje': mensaje, 'asunto': asunto})
                .success(
                    function (data) {
                        console.log(data);
                        callback(data);
                    })
                .error(function (data) {
                    console.log(data);
                });
        }
    }
})();