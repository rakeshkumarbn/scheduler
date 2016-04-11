'use strict';


//F M T Service Factory
angular.module('csi.common')
    .factory('csiService', ['$rootScope', '$resource', 'serviceFactory', 'xdrService','$location',
        function ($rootScope, $resource, serviceFactory, xdrService,$location) {

            var serviceUrl;
            var serviceType = 'dev', userAgent = 'DESKTOP', channelName = 'WEB', wfc = 'FMT', xmlFormat = 'false';
            var isAndroid = false;
            var userAgentFASTValue = getUserAgent(navigator.userAgent);

            var appName = 'MCL_WEB';

            var fenv = "https://sitservices.caremark.com:11090";

            var arr = (/msie (\d+)/.exec(lowercase(navigator.userAgent)));
            var msie = (arr || [])[1];

            if (isNaN(msie)) {
                arr = (/trident\/.*; rv:(\d+)/.exec(lowercase(navigator.userAgent)));
                msie = (arr || [])[1];
            }

            var isDemo = ($location.search().env && $location.search().env === 'demo') ? 'demo' : '';

            var _fenv = isDemo; // For local testing purpose... Should be blank

            var _apiSecret = 'E228F4CF4BE33EA5A20FE5FF9D5573F8';
            var _apiKey = '1008347202313004A50F01F33D27EAB1';

            //Changes to read API Key and API Secret from URL

            if ($location.search()['apiKey'] && $location.search()['apiKey'].length > 0) {
                _apiKey = $location.search()['apiKey'];
            }

            if ($location.search()['apiSecret'] && $location.search()['apiSecret'].length > 0) {
                _apiSecret = $location.search()['apiSecret'];
            }

            if (fenv && fenv.slice(-1) !== '/') {
                fenv = fenv + '/';
            }


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

            function lowercase(string) {
                return string.toLowerCase();
            }


            var url;

            function urlMaker(params, method, serviceName, serviceType) {
                url = {
                    domain: fenv,
                    domainId: params.domain,
                    method: method,
                    params: {
                        appName: appName,
                        lineOfBusiness: 'MINUTE_CLINIC',
                        deviceID:'device12345',
                        channelName: channelName,
                        deviceType: userAgentFASTValue,
                        apiKey: _apiKey,
                        apiSecret: _apiSecret,
                        serviceName: serviceName,
                        serviceCORS: 'TRUE'
                    },
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                };
                for (var key in params) {
                    url.params[key] = params[key];
                }

                var finalURL = constructURL(url);
                return finalURL;

            }

            // Make URL
            function constructURL(url) {
                var finalURL;
                finalURL = url.domain + url.domainId + "/" + url.method;
                // buld params
                if (url.params) {
                    var params = "?";

                    if (!Object.keys) {
                        Object.keys = function (obj) {
                            var keys = [];
                            for (var i in obj) {
                                if (obj.hasOwnProperty(i)) {
                                    keys.push(i);
                                }
                            }
                            return keys;
                        };
                    }
                    // building params
                    for (var i = 0, keys = Object.keys(url.params); i < keys.length; i++) {
                        if (keys[i] == 'domain')
                            continue;
                        params += (keys[i] + "=" + url.params[keys[i]] + (( i < keys.length - 1) ? "&" : ""));
                    }
                    // final URL with params
                    finalURL += params;
                }

                return finalURL;
            };


            if (_fenv == 'demo') {

                return $resource('https://' + fenv + '444/refill/:id',
                    {
                        version: '1.0'
                    },
                    {
                        //Service Call Methods
                        authenticateUser: {
                            url: 'assets/data/authenticateUser.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                id: 'Authenticate',
                                serviceName: 'Authenticate'
                            }
                        },
                        requestSMSToken: {
                            url: 'assets/data/requestSMSToken.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                id: 'sendSMSToken',
                                serviceName: 'sendSMSToken'
                            }
                        },
                        authorizeSMSToken: {
                            url: 'assets/data/authorizeToken.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                id: 'authorizeToken',
                                serviceName: 'authorizeToken'
                            }
                        },
                        searchClinic: {
                            url: 'assets/data/getClinicConfiguration.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                id: 'authorizeToken',
                                serviceName: 'authorizeToken'
                            }
                        },
                        updateClinicConfig: {
                            url: 'assets/data/updateClinicConfiguration.json',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            params: {
                                id: 'authorizeToken',
                                serviceName: 'authorizeToken'
                            }
                        }
                    }
                );
            }
            else if (msie == 8 || msie==9) {
                return {
                    authenticateUser: function (params, data, success, error) {
                        params.domain = 'minuteClinic';
                        params.deviceToken = '12232434';
                        params.version = '1.0';
                        serviceUrl = urlMaker(params, 'fieldManagerLogin', 'fieldManagerLogin', serviceType);
                        xdrService.makeRequest(serviceUrl, data, success, error,true,false);
                    },
                    requestSMSToken: function (params, data, success, error) {
                        params.domain = 'minuteClinic';
                        params.deviceToken = '12232434';
                        params.version = '1.0';
                        serviceUrl = urlMaker(params, 'fieldManagerLogin', 'fieldManagerLogin', serviceType);
                        xdrService.makeRequest(serviceUrl, data, success, error,true,false);
                    },
                    authorizeSMSToken: function (params, data, success, error) {
                        params.domain = 'minuteClinic';
                        params.deviceToken = '12232434';
                        params.version = '1.0';
                        serviceUrl = urlMaker(params, 'fieldManagerLogin', 'fieldManagerLogin', serviceType);
                        xdrService.makeRequest(serviceUrl, data, success, error,true,false);
                    },
                    searchClinic: function (params, data, success, error) {
                        params.domain = 'minuteClinic';
                        params.deviceToken = '12232434';
                        params.version = '1.0';
                        serviceUrl = urlMaker(params, 'searchClinic', 'searchClinic', serviceType);
                        xdrService.makeRequest(serviceUrl, data, success, error,true,false);
                    },
                    updateClinicConfig: function (params, data, success, error) {
                        params.domain = 'minuteClinic';
                        params.deviceToken = '12232434';
                        params.version = '1.0';
                        serviceUrl = urlMaker(params, 'updateClinicHours', 'updateClinicHours', serviceType);
                        xdrService.makeRequest(serviceUrl, data, success, error,true,false);
                    }

                };
            }
            else {
                return $resource(fenv + ':domain/:id',
                    {
                        appName: appName,
                        domain: 'minuteClinic',
                        lineOfBusiness: 'MINUTE_CLINIC',
                        channelName: channelName,
                        deviceType: userAgentFASTValue,
                        deviceID: 'device12345',
                        deviceToken: '12232434',
                        version: '1.0',
                        serviceCORS: 'TRUE',
                        // SIT
                        apiKey: _apiKey,
                        apiSecret: _apiSecret
                    },
                    {
                        requestSMSToken: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain'
                            },
                            params: {
                                id: 'fieldManagerLogin',
                                serviceName: 'fieldManagerLogin'
                            }
                        },
                        authorizeSMSToken: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain'
                            },
                            params: {
                                id: 'fieldManagerLogin',
                                serviceName: 'fieldManagerLogin'
                            }
                        },
                        authenticateUser: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain',
                                'Accept': 'application/json'
                            },
                            params: {
                                id: 'fieldManagerLogin',
                                serviceName: 'fieldManagerLogin'
                            }
                        },
                        searchClinic:{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain'
                            },
                            params: {
                                id: 'searchClinic',
                                serviceName: 'searchClinic'
                            }
                        },
                        updateClinicConfig: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain',
                                'Accept': 'application/json'
                            },
                            params: {
                                id: 'updateClinicHours',
                                serviceName: 'updateClinicHours'
                            }
                        }

                    }

                );
            }

        }]);

