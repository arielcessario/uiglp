(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;
    angular.module('uiglp.busquedasLaborales', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: currentScriptPath.replace('.min.js', '.html'),
                controller: 'BusquedasLaboralesController'
            });
        }])
        .controller('BusquedasLaboralesController', BusquedasLaboralesController);


    BusquedasLaboralesController.$inject = ['OfertasLaborales'];
    function BusquedasLaboralesController(OfertasLaborales) {

        var vm = this;
        
    }
})();