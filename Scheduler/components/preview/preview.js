/**
 * Created by raki on 10/25/15.
 */

(function(){
   'use strict';

    angular.module('csi.preview').
        controller('Preview',Preview);

    function Preview($rootScope, $location, $timeout, activeModel){

        var previewScope = this;
        
        previewScope.url = $location.url();
        if(previewScope.url !== '/' && activeModel.campaignFlow === false){
            $location.path('/');
        }

        previewScope.schemaName = 'Test Schema';
        previewScope.selectedOi = activeModel.selectedOi;
        previewScope.selectionData = activeModel.selectionData[0].campaignSelection;
        previewScope.scheduledData = activeModel.scheduledData[0].campaignScheduler;
        previewScope.customTemplate = activeModel.customTemplate;

        previewScope.location = function(path){
            $location.path(path);
        }

    };
})();