/**
 * Created by raki on 10/25/15.
 */

(function(){
   'use strict';

    angular.module('csi.os').
        controller('OpportunitySelect',OpportunitySelect);

    function OpportunitySelect($rootScope, $location,activeModel, $modal){

        var osScope = this;


        osScope.url = $location.url();
        if(osScope.url !== '/' && activeModel.campaignFlow === false){
            $location.path('/');
        }
        
        osScope.campaigns = activeModel.campaigns;
        osScope.selectionData = activeModel.selectionData;
        osScope.selectedOi = activeModel.selectedOi;

        osScope.selectedFieldnames=[];
        osScope.selectedOperators=[];
        osScope.selectedValues=[];
        osScope.selectedRelationalOperators=[];
        osScope.disableRelationalOperator = false;

        osScope.hideFirstRemove = function (oppValue) {
            if(oppValue === 'Row0'){
                return 'hide-visibility';
            }
        };
        osScope.fieldNames = [{name :'ColumnName1'},{name:'ColumnName2'},{name:'ColumnName3'},{name:'ColumnName4'},{name:'ColumnName5'},{name:'ColumnName6'}];

        if(osScope.selectedOi !== undefined && osScope.selectedOi.length > 0){
            osScope.fieldname = osScope.selectedOi[0].campaignIdentification.campaignFieldNames;
            osScope.schemaName = osScope.selectedOi[0].campaignIdentification.campaignSchema.name;
        }

        osScope.operator = [
        	{"id" : "1", "name" : "Equals"},
        	{"id" : "2", "name" : " ! Equals"},
            {"id":"3","name":'Greater Than'},
            {"id":"4","name":'Less Than'},
            {"id":"5","name":'Greater Than Equals'},
            {"id":"6","name":'Less Than Equals'},
            {"id" : "7", "name" : "Like"},
            {"id" : "8", "name" : "Between"},
            {"id" : "9", "name" : "In"}
        ];
        osScope.relationalOperator = [
        	{"id" : "1", "name" : "AND"},
        	{"id" : "2", "name" : "OR"},
            {"id" : "3", "name" : "NOT"}
        ];
        osScope.value = [];

        if(osScope.selectionData !== undefined && osScope.selectionData.length !== 0){          
            var v;              
            osScope.Opportunity = [];
            osScope.selectedFieldnames = [];
            for(v=0;v<osScope.selectionData[0].campaignSelection.length;v++){
                osScope.Opportunity.push('Row' + v);
                osScope.selectedFieldnames['Row' + v] = osScope.selectionData[0].campaignSelection[v]["CampaignSelectionFieldNames"];
                osScope.selectedOperators['Row' + v] = osScope.selectionData[0].campaignSelection[v]["operator"];
                osScope.selectedValues['Row' + v] = osScope.selectionData[0].campaignSelection[v]["value"];
                osScope.selectedRelationalOperators['Row' + v] = osScope.selectionData[0].campaignSelection[v]["relationalOperator"];
                if(osScope.selectionData[0].campaignSelection[v]["relationalOperator"] != null){
                    osScope.disableRelationalOperator = true;
                }
            } 
            osScope.counter = v+1;
        } else{
            osScope.counter = 1;   
            osScope.Opportunity = ['Row0'];
        }

        osScope.add = function(){
			osScope.Opportunity.push('Row' + osScope.counter);
			osScope.counter++;  
            osScope.disableRelationalOperator = false;      	
        };

        osScope.remove = function(index){
			osScope.Opportunity.splice( index, 1 ); 
            osScope.disableRelationalOperator = true;          	
        };

        osScope.lastRelationalOperator = function(last,value){
            if(last == true && value != null){
                osScope.disableRelationalOperator = true;
            }else{
                osScope.disableRelationalOperator = false;
            }
        };



        osScope.showModal = function () {
            var ModalInstanceCtrl = function  ($scope,$modal) {
                $scope.campaigns = osScope.campaigns;
                $scope.campaignsSchemaName = osScope.schemaName;
                $scope.previewModal = function(previewModal){
                    var ModalInstancePreviewCtrl = function($scope){
                        $scope.previewCampaigns = osScope.campaigns;
                        $scope.newPreviewModal = previewModal;    
                    }                    
                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'components/common/modal/similar.campaign.preview.html',
                        controller: ModalInstancePreviewCtrl,
                        size: 'md'
                    }); 
                }
            }
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'components/common/modal/similar.campaign.list.html',
                controller: ModalInstanceCtrl,
                size: 'md'
            });
        }
        osScope.location = function(path){
            if(path === '/'){
                $location.path('/')
            }
            else {
                osScope.selectionData = [];
                var i;
                //osScope.selectionData.push('campaignSelection');
                for (i = 0; i < osScope.Opportunity.length; i++) {
                    osScope.selectionData.push({
                        'CampaignSelectionFieldNames': osScope.selectedFieldnames[(osScope.Opportunity[i])],
                        'operator': osScope.selectedOperators[(osScope.Opportunity[i])],
                        'value': osScope.selectedValues[(osScope.Opportunity[i])],
                        'relationalOperator': osScope.selectedRelationalOperators[(osScope.Opportunity[i])]
                    });
                }
                osScope.selectionData = [{
                    'campaignSelection': osScope.selectionData
                }];

                activeModel.selectionData = osScope.selectionData;
                console.log(osScope.selectedFieldnames);
                $location.path(path);
            }
        }

    };
})();