(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.busquedasLaborales', ['ngRoute', ['ofertas_laborales/ofertas_laborales.min.js']])
        .config(['$routeProvider', function ($routeProvider) {
            //$routeProvider.when('/busquedas_laborales', {
            //    templateUrl: currentScriptPath.replace('.min.js', '.html'),
            //    controller: 'BusquedasLaboralesController',
            //
            //    data: {requiresLogin: false}
            //});
        }])
        .controller('BusquedasLaboralesController', BusquedasLaboralesController);


    BusquedasLaboralesController.$inject = ['OfertasLaboralesService'];
    function BusquedasLaboralesController(OfertasLaboralesService) {

        var vm = this;
        vm.busquedas = [];
        OfertasLaboralesService.getActivas(function(data){
            vm.busquedas = data;
        })

    }
})();