/**
 * Created by raki on 10/25/15.
 */

(function(){
   'use strict';

    angular.module('csi.scheduler').
        controller('Scheduler',Scheduler);

    function Scheduler($rootScope, $location, $timeout, activeModel, $modal){

        var schedScope = this;

        schedScope.url = $location.url();
        if(schedScope.url !== '/' && activeModel.campaignFlow === false){
            $location.path('/');
        }
        
        schedScope.selectedOi = activeModel.selectedOi;
        if(schedScope.selectedOi){
            if(schedScope.selectedOi.length !== 0){
                schedScope.schemaName = activeModel.selectedOi[0].campaignIdentification.campaignSchema.name;
                schedScope.fieldNames = activeModel.selectedOi[0].campaignIdentification.campaignFieldNames;
            }else{
                schedScope.schemaName = 'No Data';
            }
        }

        schedScope.selectedSched = activeModel.scheduledData;
        schedScope.campaigns = activeModel.campaigns;

        schedScope.deliveryModes = [{'id': '1','name' :'SMS'},{'id': '2','name':'PUSH'},{'id': '3','name':'EMAIL'}];

        schedScope.templateTypes = [{'id': '1','name' :'Native'},{'id': '2','name':'BCC'},{'id': '3','name':'WCM'},{'id': '4','name':'Custom'}];

        schedScope.templateIds = [{'name' :'Template 1'},{'name':'Template 2'},{'name':'Template 3'},{'name':'Template 4'}];

        schedScope.scheduleTypes = [{'id': '1','name' :'One Time'},{'id': '2','name':'Daily'},{'id': '3','name':'Weekly'},{'id': '4','name':'Monthly'},{'id': '5','name':'Yearly'}];

        schedScope.weeklyValues = [{'id': '1','name' :'Monday'},{'id': '2','name':'Tuesday'},{'id': '3','name':'Wednesday'},{'id': '4','name':'Thursday'},{'id': '5','name':'Friday'},{'id': '6','name':'Saturday'},{'id': '7','name':'Sunday'}];

        schedScope.monthlyValues = [{'id': '1','name' :'January'},{'id': '2','name':'February'},{'id': '3','name':'March'},{'id': '4','name':'April'},{'id': '5','name':'May'},{'id': '6','name':'June'},{'id': '7','name':'July'},{'id': '8','name':'August'},{'id': '9','name':'September'},{'id': '10','name':'October'},{'id': '11','name':'November'},{'id': '12','name':'December'}];

        schedScope.yearlyValues = [{'id': '1','name' :'January, 2015'},{'id': '2','name':'February, 2015'},{'id': '3','name':'March, 2015'},{'id': '4','name':'April, 2015'},{'id': '5','name':'May, 2015'},{'id': '6','name':'June, 2015'},{'id': '7','name':'July, 2015'},{'id': '8','name':'August, 2015'},{'id': '9','name':'September, 2015'},{'id': '10','name':'October, 2015'},{'id': '11','name':'November, 2015'},{'id': '12','name':'December, 2015'}];

        schedScope.weeklyOutputModel = [];
        schedScope.monthlyOutputModel = [];
        schedScope.yearlyOutputModel = [];
        schedScope.showCustomButton = false;

        var today = new Date();
        var d = new Date();
        schedScope.startDate = today;
        schedScope.endDate = today;

        
        schedScope.times = [];
        for (var i=0; i<24; i++) {
            var suf = 'am';
            var time12 = i;
            if (i>12){
                suf='pm';
                time12 = i-12;
            } else if (i == 0){
                time12 = 12;
            }
            for (var x=0; x<60; x=x+15) {
                var time = {};
                if (x == 0) {
                    time.display = (time12 == 0 ? '00' : time12) + ':00 ' + suf;
                    time.id = (i == 0 ? '00' : i)  + ':00';
                }
                else {
                    time.display = time12 + ':' + x + ' ' + suf;
                    time.id = (i == 0 ? '00' : i) + ':' + x;
                }

                schedScope.times.push(time);
            }
        };

        schedScope.schedType = function(value) {
            if(value === null){
                schedScope.weekly = false;
                schedScope.monthly = false;
                schedScope.yearly = false;                
            }
            else if(value.name === 'Weekly'){
                schedScope.weekly = true;
                schedScope.monthly = false;
                schedScope.yearly = false;
            }
            else if(value.name === 'Monthly'){
                schedScope.weekly = false;
                schedScope.monthly = true;
                schedScope.yearly = false;
            }
            else if(value.name === 'Yearly'){
                schedScope.weekly = false;
                schedScope.monthly = false;
                schedScope.yearly = true;
            }
        };

        schedScope.deliveryModeType = function(deliveryModeType) {
            if(deliveryModeType !== null){
                schedScope.showDeliveryModeType = true;
            }else{
                schedScope.showDeliveryModeType = false;
            }
        };

/*        schedScope.shouldShowCustom = function(typeTemplateIds){
            if(schedScope.templateType.name === 'Custom'){
                return typeTemplateIds.name === 'Create Custom Template';
            }else{
                return typeTemplateIds.name !== 'Create Custom Template';
            }
        };*/

        //populate for multi selected clinics

        schedScope.startTimes = schedScope.times.slice();
        schedScope.endTimes = schedScope.times.slice();

        schedScope.open = function (dt) {
            $timeout(function() {
                if (dt == 'start'){
                    schedScope.isSD = true;
                } else if (dt == 'end') {
                    schedScope.isED = true;
                } else if(dt == 'yearly'){
                    schedScope.isYearly = true;
                }

            });

        };

        if(schedScope.selectedSched){
            if(schedScope.selectedSched.length !== 0){
                schedScope.scheduledDataReterived = activeModel.scheduledData[0].campaignScheduler;
                schedScope.startDate = schedScope.scheduledDataReterived.campaignStartDate;
                schedScope.endDate = schedScope.scheduledDataReterived.campaignEndDate;
                schedScope.deliveryMode = schedScope.scheduledDataReterived.campaignDeliveryMode;
                if(schedScope.deliveryMode !== null){
                    schedScope.showDeliveryModeType = true;
                }
                schedScope.templateType = schedScope.scheduledDataReterived.campaignTemplateType;
                schedScope.templateId = schedScope.scheduledDataReterived.campaignTemplateId;
                schedScope.selectedStartTime = schedScope.scheduledDataReterived.campaignStartTime;
                schedScope.scheduleType = schedScope.scheduledDataReterived.campaignScheduleType;
                if(schedScope.scheduledDataReterived.campaignScheduleType !== undefined) {
                    if (schedScope.scheduledDataReterived.campaignScheduleType.name === 'Weekly') {
                        schedScope.weekly = true;
                        schedScope.monthly = false;
                        schedScope.yearly = false;
                        angular.forEach(schedScope.weeklyValues, function (weeklyvalues) {
                            angular.forEach(schedScope.scheduledDataReterived.campaignScheduleTypeValue, function (weeklySelectedValues) {
                                if (weeklyvalues.name === weeklySelectedValues.name) {
                                    weeklyvalues.ticked = true;
                                }
                            });
                        });
                    }
                    if (schedScope.scheduledDataReterived.campaignScheduleType.name === 'Monthly') {
                        schedScope.weekly = false;
                        schedScope.monthly = true;
                        schedScope.yearly = false;
                        angular.forEach(schedScope.monthlyValues, function (monthlyValues) {
                            angular.forEach(schedScope.scheduledDataReterived.campaignScheduleTypeValue, function (monthlySelectedValues) {
                                if (monthlyValues.name === monthlySelectedValues.name) {
                                    monthlyValues.ticked = true;
                                }
                            });
                        });
                    }
                    if (schedScope.scheduledDataReterived.campaignScheduleType.name === 'Yearly') {
                        schedScope.weekly = false;
                        schedScope.monthly = false;
                        schedScope.yearly = true;
                        angular.forEach(schedScope.yearlyValues, function (yearlyValues) {
                            angular.forEach(schedScope.scheduledDataReterived.campaignScheduleTypeValue, function (yearlySelectedValues) {
                                if (yearlyValues.name === yearlySelectedValues.name) {
                                    yearlyValues.ticked = true;
                                }
                            });
                        });
                    }
                }
            }
        }

        schedScope.showModal = function () {
            var ModalInstanceCtrl = function  ($scope,$modal) {
                $scope.campaigns = schedScope.campaigns;
                $scope.campaignsSchemaName = schedScope.schemaName;
                $scope.previewModal = function(previewModal){
                    var ModalInstancePreviewCtrl = function($scope){
                        $scope.previewCampaigns = schedScope.campaigns;
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

        schedScope.tempalateTypeChange = function(tempalateTypeChangeValue){
            schedScope.templateId = null;
            if(tempalateTypeChangeValue.name === 'Custom'){
                schedScope.showCustomButton = true;
            }
        };

        schedScope.templateIdCustom = function(templateIdCustomValue){
            if(templateIdCustomValue === 'Create Custom Template'){
                var ModalCustomTemplateCtrl = function  ($scope, $modalInstance) {
                    $scope.customTemplateVar = {};
                    $scope.customTemplateVar.fieldNames = schedScope.fieldNames; 
                    if(activeModel.customTemplate.name !== undefined && activeModel.customTemplate.description !== undefined){
                        $scope.customTemplateName = activeModel.customTemplate.name;
                        $scope.customTemplateVar.customTemplateContainer = activeModel.customTemplate.description;
                    }
                    $scope.onChangeModalFieldName = function(modalFieldName){
                        if($scope.customTemplateVar.customTemplateContainer !== undefined)
                        $scope.customTemplateVar.customTemplateContainer = $scope.customTemplateVar.customTemplateContainer +' <<'+modalFieldName.name+'>> ';
                        else
                            $scope.customTemplateVar.customTemplateContainer = ' <<'+modalFieldName.name+'>> ';

                    };
                    $scope.newCustomTemplate = function(customTemplateName,customTemplateContainer){
                        schedScope.templateIds.push({'name':customTemplateName});
                        schedScope.templateId = {'name':customTemplateName};
                        schedScope.customTemplate = {'name' : customTemplateName, 'description' : customTemplateContainer};
                        activeModel.customTemplate = schedScope.customTemplate;
                        $modalInstance.close();
                    };
                }
                var modalInstanceCustomTemplate = $modal.open({
                    animation: true,
                    templateUrl: 'components/common/modal/custom.template.html',
                    controller: ModalCustomTemplateCtrl,
                    size: 'md'
                });
            }
        };
        
        if(activeModel.customTemplate.name !== undefined){            
            schedScope.templateIds.push({'name':activeModel.customTemplate.name});
            schedScope.templateId = {'name':activeModel.customTemplate.name};
            schedScope.showCustomButton = true;
        }


        schedScope.location = function(path){
            if(path === '/'){
                $location.path(path);
            }
            else {
                if(schedScope.scheduleType !== undefined) {
                    if (schedScope.scheduleType.name === 'Weekly') {
                        schedScope.scheduleTypeValue = schedScope.weeklyOutputModel;
                    }
                    if (schedScope.scheduleType.name === 'Monthly') {
                        schedScope.scheduleTypeValue = schedScope.monthlyOutputModel;
                    }
                    if (schedScope.scheduleType.name === 'Yearly') {
                        schedScope.scheduleTypeValue = schedScope.yearlyOutputModel;
                    }
                }
                schedScope.scheduledData = [];

                schedScope.scheduledData = {
                    'campaignStartDate': schedScope.startDate,
                    'campaignEndDate': schedScope.endDate,
                    'campaignStartTime': schedScope.selectedStartTime,
                    'campaignDeliveryMode': schedScope.deliveryMode,
                    'campaignTemplateType': schedScope.templateType,
                    'campaignTemplateId': schedScope.templateId,
                    'campaignScheduleType': schedScope.scheduleType,
                    'campaignScheduleTypeValue': schedScope.scheduleTypeValue
                };

                schedScope.scheduledData = [{
                    'campaignScheduler': schedScope.scheduledData
                }];

                activeModel.scheduledData = schedScope.scheduledData;
                $location.path(path);
            }
        }

    };
})();