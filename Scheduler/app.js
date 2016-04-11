/**
 * Created by raki on 10/24/15.
 */
(function () {

    'use strict';
    var run;
    angular.module('csi', [
        'ngRoute',
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'csi.dashboard',
        'csi.oi',
        'csi.os',
        'csi.preview',
        'csi.scheduler',
        'csi.confirmation',
        'csi.common',
        'datatables',
        'multi-select'
    ])
    .run(run);

    run.$inject = ['$rootScope','$location'];

    function run($rootScope,$location){

        $rootScope.$on('$routeChangeStart',function(event){
           console.log("route change");
        });

    }

})();