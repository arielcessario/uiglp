(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.replace('.min', '');
    angular.module('uiglp.revistas', ['ngRoute',['revistas/issuu.min.js']])
        .config(['$routeProvider', function ($routeProvider) {
            //$routeProvider.when('/revistas', {
            //    templateUrl: currentScriptPath.replace('.js', '.html'),
            //    controller: 'RevistasController',
            //    data: {requiresLogin: false}
            //});
        }])
        .controller('RevistasController', RevistasController)
        .factory('RevistasService', RevistasService);


    RevistasController.$inject = ['RevistasService', 'LoginState', 'store', '$location', '$sce'];
    function RevistasController(RevistasService, LoginState, store, $location, $sce) {

        var vm = this;

        vm.revistas = [];
        vm.links = [];
        RevistasService.get(function (data) {
            //console.log(data);

            vm.links = [];
            for (var i = 0; i < data.length; i++) {
                vm.links.push({link:$sce.trustAsResourceUrl('//e.issuu.com/embed.html#' + data[i].link), nombre: data[i].nombre});
            }


            vm.revistas = data;
        })


    }

    RevistasService.$inject = ['$http'];
    function RevistasService($http) {
        var url = 'revistas/revistas.php';
        var service = {};

        service.get = get;
        service.save = save;
        service.remove = remove;

        return service;

        function get(callback) {
            $http.get(url + '?function=get')
                .success(function (data) {
                    callback(data)
                })
                .error(function (data) {
                    callback(data)
                });
        }

        function save(_function, revista, callback) {
            return $http.post(url,
                {'function': _function, 'item': JSON.stringify(revista)})
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data)
                })
        }

        function remove(revista, callback) {
            return $http.post(url,
                {'function': 'delete', 'item': JSON.stringify(revista)})
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data)
                })
        }


    }
})();