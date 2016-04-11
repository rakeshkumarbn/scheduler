'use strict';


angular.module('csi.common')
    .factory('xdrService', ['$rootScope', '$window', 'serviceFactory','$timeout',
        function ($rootScope, $window, serviceFactory,$timeout) {
    function makeRequest(url, data, success, error, requestTransform,personalization) {
        var xdr = new $window.XDomainRequest();
        var x2js = new X2JS();
        var tryAgain = function(){
            location.reload();
        };

        $timeout(function () {
            if (xdr) {
                //event raised when there is an error that prevents the completion of
                // the cross-domain request.
                xdr.onerror = function () {
                    $rootScope.$apply(function () {
                        $rootScope.ieLoadingDiv = false;
                        if (error) {
                            error(xdr.responseText);
                        }
                    });
                };

                xdr.onprogress = function () {
                    //console.log("Receiving data from server!");
                };
                //Raised when the object has been completely received from the server.
                xdr.onload = function () {
                    $rootScope.$apply(function () {
                        var jsondata;
                        $rootScope.ieLoadingDiv = false;
                        if (xdr.responseText) {
                            var x2js = new X2JS();
                            jsondata = x2js.xml_str2json(xdr.responseText);
                            if (jsondata.response && jsondata.response.header && jsondata.response.header.statusCode == "3004") {
                                jsondata.response.header.statusDesc = errors.getErrorMessage("100");
                                if (error) {
                                    error(jsondata);
                                }
                            } else {
                                if (success) {
                                    success(jsondata);
                                }
                            }
                        } else {
                            jsondata = "No Response Object";
                        }
                    });
                };
                try {
                    $rootScope.ieLoadingDiv = true;
                    xdr.open("post", url);
                    if (data) {
                        xdr.send(data);

                    } else {
                        xdr.send();
                    }
                }catch(ex){
                    $rootScope.ieLoadingDiv = false;
                    //help.generalModal("We are Sorry!", ex.message, refillFooter);
                }
            }
        }, 2000);
    }

    return {
        makeRequest: makeRequest
    };
}]);


