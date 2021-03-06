(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('acUtils', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/module', {
                templateUrl: currentScriptPath.replace('.js', '.html'),
                controller: 'AcUtils'
            });
        }])
        .controller('AcUtilsController', AcUtilsController)
        .factory('AcUtilsService', AcUtilsService)
        .service('AcUtilsGlobals', AcUtilsGlobals)
    ;


    AcUtilsController.$inject = [];
    function AcUtilsController() {
    }

    AcUtilsGlobals.$inject = ['$rootScope'];
    function AcUtilsGlobals($rootScope) {
        this.isWaiting = false;
        this.sucursal_auxiliar_id = -1;
        this.broadcast = function () {
            $rootScope.$broadcast("AcUtilsGlobalsValidations")
        };
        this.listen = function (callback) {
            $rootScope.$on("AcUtilsGlobalsValidations", callback)
        };
    }


    AcUtilsService.$inject = ['AcUtilsGlobals'];
    function AcUtilsService(AcUtilsGlobals) {
        var service = {};

        service.validateEmail = validateEmail;
        service.validations = validations;

        return service;


        function verifyBrowser() {

            var obj = {};
            obj.isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
            obj.isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
            obj.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
            // At least Safari 3+: "[object HTMLElementConstructor]"
            obj.isChrome = !!window.chrome && !isOpera;              // Chrome 1+
            obj.isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

            return obj;
        }

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }


        function validations(control, texto) {
            var id = Math.floor((Math.random() * 1000) + 1);
            var elem = angular.element(document.querySelector('#' + control));
            elem.addClass('error-input');
            elem.after('<div class="error-message" id="error-' + id + '">' + texto + '</div>');
            var mensaje = angular.element(document.querySelector('#error-' + id));


            mensaje.css('top', (elem[0].offsetTop + elem[0].offsetHeight) + 'px');
            mensaje.css('left', elem[0].offsetLeft + 'px');

            clear();

            function clear() {
                elem[0].addEventListener('focus', function () {
                    elem.removeClass('error-input');
                    elem[0].removeEventListener('focus');
                    mensaje.remove();
                });
            }

            AcUtilsGlobals.listen(function () {
                var control = angular.element(document.querySelectorAll('.error-input'));
                var error = angular.element(document.querySelectorAll('.error-message'));


                for (var i = 0; i < control.length; i++) {

                    control[i].classList.remove('error-input');
                    control[i].removeEventListener('focus');
                    mensaje.remove();
                }
                for (var i = 0; i < error.length; i++) {
                    error[i].remove();
                }
            });

        }
    }

})();

