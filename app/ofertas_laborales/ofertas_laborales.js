(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('ofertasLaborales', ['ngRoute'])
        .factory('OfertasLaboralesService', OfertasLaboralesService);


    OfertasLaboralesService.$inject = ['$http'];
    function OfertasLaboralesService($http) {
        var service = {};
        var url = currentScriptPath.replace('.js', '.php');

        service.get = get;
        service.getById = getById;
        service.create = create;
        service.update = update;
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

        function getById(id, callback) {
            get(function (data) {
                var response = data.filter(function (elem, index, array) {
                    return id == elem.oferta_laboral_id;
                })[0];

                callback(response);
            });
        }

        function create(oferta_laboral, callback) {
            return $http.post(url,
                {'function': 'create', 'item': JSON.stringify(oferta_laboral)})
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data)
                })
        }

        function update(oferta_laboral, callback) {
            return $http.post(url,
                {'function': 'update', 'item': JSON.stringify(oferta_laboral)})
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data)
                })
        }

        function remove(oferta_laboral, callback) {
            return $http.post(url,
                {'function': 'remove', 'item': JSON.stringify(oferta_laboral)})
                .success(function (data) {
                    callback(data);
                })
                .error(function (data) {
                    callback(data)
                })
        }
    }
})();
