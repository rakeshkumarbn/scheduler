/**
 * Created by raki on 10/25/15.
 */

(function(){
   'use strict';

    angular.module('csi.oi').
        controller('OpportunityID',OpportunityID);

    function OpportunityID($rootScope,$location,activeModel){

        var oiScope = this;

        oiScope.url = $location.url();
        if(oiScope.url !== '/' && activeModel.campaignFlow === false){
            $location.path('/');
        }

        oiScope.selectedOi = activeModel.selectedOi;

        oiScope.schemaNames = [{lobGroup : "Caremark",submenu : [{name :'Test Schema1'},{name:'Test Schema2'},{name:'Test Schema3'},{name:'Test Schema4'},{name:'Test Schema5'},{name:'Test Schema6'},{name:'Test Schema7'}]},{lobGroup : "Speciality",submenu : [{name :'Test Schema1'},{name:'Test Schema2'},{name:'Test Schema3'},{name:'Test Schema4'},{name:'Test Schema5'},{name:'Test Schema6'},{name:'Test Schema7'}]},{lobGroup : "Retail",submenu : [{name :'Test Schema1'},{name:'Test Schema2'},{name:'Test Schema3'},{name:'Test Schema4'},{name:'Test Schema5'},{name:'Test Schema6'},{name:'Test Schema7'}]}];

        oiScope.types = [{name :'Batch'},{name:'Real-Time'}];

        oiScope.fieldNames = [{name :'ColumnName1', description : 'Description for Column1'},{name:'ColumnName2', description : 'Description for Column2'},{name:'ColumnName3', description : 'Description for Column3'},{name:'ColumnName4', description : 'Description for Column4'},{name:'ColumnName5', description : 'Description for Column5'},{name:'ColumnName6', description : 'Description for Column6'}];

        //oiScope.inputModel = [{name :'Field1'},{name:'Field2'}];
        oiScope.outputModel = [];

        if(oiScope.selectedOi){
            if(oiScope.selectedOi.length !== 0){
                oiScope.selectedOiReterived = oiScope.selectedOi[0].campaignIdentification;
                oiScope.campaignDesc = oiScope.selectedOiReterived.campaignDesc;
                oiScope.campaignName = oiScope.selectedOiReterived.campaignName;
                oiScope.schemaGroupName = oiScope.selectedOiReterived.campaignSchemaGroup;
                oiScope.schemaName = oiScope.selectedOiReterived.campaignSchema;
                oiScope.campaignType = oiScope.selectedOiReterived.campaignType;
                oiScope.selectedFields = oiScope.selectedOiReterived.campaignFieldNames;
                angular.forEach(oiScope.fieldNames, function(fieldNames) {
                    angular.forEach(oiScope.selectedFields, function(selectedFields) {
                        if(fieldNames.name === selectedFields.name){
                            fieldNames.ticked = true;
                        }
                    });
                }); 
                oiScope.pageTitle= 'Edit Campaign';
            }
            else{
                oiScope.pageTitle= 'Add Campaign';
            }
        }

        oiScope.schemaGroupNameSelect = function (schemaGroupName) {
            oiScope.schemaGroupName = {"lobGroup" : schemaGroupName};
        };

        oiScope.schemaNameSelect = function (schemaName) {
            oiScope.schemaName = {"name" : schemaName};
        };

        $('.buttonLabel').tooltip();

        oiScope.location = function(path){
            oiScope.oiValues = {'campaignIdentification':{'campaignName' : oiScope.campaignName,'campaignDesc' : oiScope.campaignDesc, 'campaignSchemaGroup' : oiScope.schemaGroupName, 'campaignSchema' : oiScope.schemaName, 'campaignType' : oiScope.campaignType, 'campaignFieldNames' : oiScope.outputModel}};
            if(oiScope.selectedOi.length === 0){
                oiScope.selectedOi.push(oiScope.oiValues);
            }else{
                angular.forEach(oiScope.selectedOi, function(selectedOi) {
                    selectedOi.campaignIdentification.campaignFieldNames = [];
                    angular.forEach(oiScope.oiValues, function(oiValues) {
                        selectedOi.campaignIdentification.campaignDesc = oiValues.campaignDesc;
                        selectedOi.campaignIdentification.campaignName = oiValues.campaignName;
                        selectedOi.campaignIdentification.campaignSchemaGroup = oiValues.campaignSchemaGroup;
                        selectedOi.campaignIdentification.campaignSchema = oiValues.campaignSchema;
                        selectedOi.campaignIdentification.campaignType = oiValues.campaignType;
                        selectedOi.campaignIdentification.campaignFieldNames = oiValues.campaignFieldNames;
                    });
                });
            }
            activeModel.selectedOi = oiScope.selectedOi;         
            $location.path(path);

        };

    };
})();