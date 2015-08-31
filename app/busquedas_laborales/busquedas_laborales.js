(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('uiglp.busquedasLaborales', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/busquedas_laborales', {
                templateUrl: currentScriptPath.replace('.min.js', '.html'),
                controller: 'BusquedasLaboralesController',

                data: {requiresLogin: false}
            });
        }])
        .controller('BusquedasLaboralesController', BusquedasLaboralesController);


    BusquedasLaboralesController.$inject = ['OfertasLaboralesService'];
    function BusquedasLaboralesController(OfertasLaboralesService) {

        var vm = this;
        vm.busquedas = [
            {
                titulo: 'BÚSQUEDA LABORAL prueba',
                contacto: 'alala@alala.com',
                detalle: 'Prueba Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            },
            {
                titulo: 'BÚSQUEDA LABORAL',
                contacto: 'alala@alala.com',
                detalle: 'Eum erant convenire eu, te est insolens sadipscing concludaturque, te has atqui consul possit. Mei causae evertitur gloriatur te, ex erat democritum pro, novum tollit maluisset at his. Inveri ullum accumsan eos, detraxit tacimates an vis. Elitr aperiam tractatos est cu.'
            }
        ];

    }
})();