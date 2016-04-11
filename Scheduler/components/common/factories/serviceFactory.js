'use strict';

// Service Request Response Factory

/* This factory will handle Request Tranformation if required after the request has been initiated by User.
   Also this will handle the response before delivering to the user. If in case we get some error or non succesfull 
   response we will directly provide error info to error module 
*/

angular.module('csi.common')
    .factory('serviceFactory', [function(){
  return {
    // Request Tranformations
    requestTranform: function(data, headersGetter){
        var xmldata = data;
        if (data && data!=='') {
            var x2js = new X2JS();
            xmldata = x2js.json2xml_str({'request': JSON.parse(JSON.stringify(data))});
        }
        return xmldata;
    },
      requestPersonalizationTranform: function(data, headersGetter){
          var xmldata = data;
          if (data && data!=='') {
              var x2js = new X2JS();
              xmldata = x2js.json2xml_str({'personalizationServiceRequest': JSON.parse(JSON.stringify(data))});
          }
          return xmldata;

      },
    //response Transformations
    responseTransform: function(data, headersGetter){
      var x2js = new X2JS();
      return x2js.xml_str2json(data);
    }
  };
}]);