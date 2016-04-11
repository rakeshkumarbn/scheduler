/**
 * Created by raki on 10/25/15.
 */

(function(){
   'use strict';

    angular.module('csi.confirmation').
        controller('Confirmation',Confirmation);

    function Confirmation($rootScope, $location, $timeout, activeModel){

        var confirmationScope = this;
        activeModel.campaignFlow === false;
        confirmationScope.schemaName = 'Test Schema';
        confirmationScope.selectedOi = activeModel.selectedOi;
        confirmationScope.selectedFields = activeModel.selectedFields;
        confirmationScope.selectionData = activeModel.selectionData;
        confirmationScope.scheduledData = activeModel.scheduledData;
        confirmationScope.verify = true;

        confirmationScope.previewConfirmation = function(){
            confirmationScope.verify = false;
        }

        confirmationScope.location = function(path){
            $location.path(path);
        }

    };
})();