/**
 * Created by Z178529 on 10/29/2015.
 */

'use strict';

angular.module('csi.common')
    .factory('userAgent', ['$rootScope', '$resource', 'serviceFactory', 'xdrService','$location',
        function ($rootScope, $resource, serviceFactory, xdrService,$location) {


            var serviceUrl;
            var serviceType = 'dev', userAgent = 'DESKTOP', channelName = 'WEB', wfc = 'FMT', xmlFormat = 'false';
            var isAndroid = false;
            var userAgentFASTValue = getUserAgent(navigator.userAgent);

            var appName = 'MCL_WEB';
            
            function getUserAgent(userAgentPickedUp) {
                // ANDROID
                if (/Android/i.test(userAgentPickedUp)) {
                    // ANDROID MOBILE
                    if (/Mobile/i.test(userAgentPickedUp)) {
                        userAgent = 'AND_MOBILE';

                        // ANDROID GLASS
                    } else if (/Glass/i.test(userAgentPickedUp)) {
                        userAgent = 'AND_GLASS';

                        // ANDROID TABLET
                    } else {
                        userAgent = 'AND_TABLET';
                    }
                    isAndroid = true;

                    // iOS Mobile
                } else if (/iPhone|iPod/i.test(userAgentPickedUp)) {
                    userAgent = 'IOS_MOBILE';


                    // iOS Tablet
                } else if (/iPad/i.test(userAgentPickedUp)) {
                    userAgent = 'IOS_TABLET';


                    // Windows
                } else if (/IEMobile/i.test(userAgentPickedUp)) {
                    userAgent = 'WIN_MOBILE';

                    // Other identified vendor
                } else if (/webOS|BlackBerry|Opera Mini/i.test(userAgentPickedUp)) {
                    userAgent = 'OTH_MOBILE';

                }
                return userAgent;
            }

            return {
                getUserAgent : getUserAgent,
                userAgentFASTValue : userAgentFASTValue
            }
        }]);