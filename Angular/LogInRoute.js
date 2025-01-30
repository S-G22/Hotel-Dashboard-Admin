/*(function () {
    'use strict';

    angular.
        module('App').
        config(['$routeProvider',
            function config($routeProvider) {
                $routeProvider.when("/", {
                    templateUrl: "/NiceAdmin/Index",
                    controller: "SystemLoginController",

                }).when("/BookingGuest", {
                    templateUrl: "/NiceAdmin/AddDailyWork",
                    controller: "ManageDailyWorkController",
                });

            }

        ]);
}());*/