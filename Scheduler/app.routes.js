/**
 * Created by raki on 10/24/15.
 */
(function(){
   'use strict';
    var config;

    angular.module('csi')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider){

        $routeProvider.when('/',{
            controller:'Dashboard',
            templateUrl:'components/dashboard/dashboard.html',
            controllerAs:'dashScope'
        });

        $routeProvider.when('/oi',{
            controller:'OpportunityID',
            templateUrl:'components/oi/oi.html',
            controllerAs:'oiScope'
        });

        $routeProvider.when('/os',{
            controller:'OpportunitySelect',
            templateUrl:'components/os/os.html',
            controllerAs:'osScope'
        });

        $routeProvider.when('/sched',{
            controller:'Scheduler',
            templateUrl:'components/scheduler/scheduler.html',
            controllerAs:'schedScope'
        });

        $routeProvider.when('/preview',{
            controller:'Preview',
            templateUrl:'components/preview/preview.html',
            controllerAs:'previewScope'
        });

        $routeProvider.when('/confirmation',{
            controller:'Confirmation',
            templateUrl:'components/confirmation/confirmation.html',
            controllerAs:'confirmationScope'
        });


        $routeProvider.otherwise({
            redirectTo:'/'
        });

    }
})();
