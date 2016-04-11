/**
 * Created by Z179536 on 11/2/2015.
 */
(function(){
    'use strict';

    angular.module('csi.dashboard', ['datatables', 'ngResource'])
        .controller('Dashboard', Dashboard);

    function Dashboard($resource, DTOptionsBuilder, DTColumnDefBuilder,$location, activeModel) {
        var vm = this;

        activeModel.selectedOi = [];
        activeModel.selectionData = [];
        activeModel.scheduledData = [];
        activeModel.customTemplate = [];

        vm.campaigns = $resource('data1.json').query();
        vm.todayFilter=null;
        vm.thisWeekFilter=null;
        vm.lastWeekFilter=null;


        vm.campaignGroups = {'enabled':[],'disabled':[]}

        //vm.dateFilter = 'afaf';
        vm.dateFilter = function(item){

            try {
                var status = false;
                if(vm.filterCheckbox.value1) {
                    if(!status){
                        var sD = moment(item.CampaignDetails.CampaignScheduler.CampaignStartDate).format('L');
                        var today = moment().format('L');
                        status =  (sD == today);
                    }
                }
                if (vm.filterCheckbox.value2) {
                    if(!status) {
                        var sD = moment().subtract(7, 'days').format('L');
                        var today = moment().format('L');
                        var checkDate =new Date(moment(item.CampaignDetails.CampaignScheduler.CampaignStartDate).format('L'));
                        status = (new Date(sD) <= checkDate && checkDate <= new Date(today));
                    }
                }
                if (vm.filterCheckbox.value3) {
                    if(!status) {
                        var eD = moment().subtract(7, 'days').format('L');
                        var sD = moment().subtract(14, 'days').format('L');
                        var checkDate =new Date(moment(item.CampaignDetails.CampaignScheduler.CampaignStartDate).format('L'));
                        status = (new Date(sD) <= checkDate && checkDate <= new Date(eD));
                    }
                }
                if (vm.filterCheckbox.value4) {
                    if(!status) {
                        var eD = moment().format('L');
                        var sD = moment().startOf('month');
                        var checkDate =new Date(moment(item.CampaignDetails.CampaignScheduler.CampaignStartDate).format('L'));
                        status = (new Date(sD) <= checkDate && checkDate <= new Date(eD));
                    }
                }
                if (vm.filterCheckbox.value5) {
                    if(!status) {
                        var eD = moment().startOf('month').subtract(1, 'days');
                        var checkDate =new Date(moment(item.CampaignDetails.CampaignScheduler.CampaignStartDate).format('L'));
                        status = (checkDate <= new Date(eD));
                    }
                }
                if (vm.filterCheckbox.value6) {
                    if(!status) {
                        status = item.CampaignEnableDisableFlag;
                    }
                }
                if (vm.filterCheckbox.value7) {
                    if(!status) {
                        if(item.CampaignEnableDisableFlag == false) {
                            status = true;
                        }
                    }
                }
                if(!vm.filterCheckbox.value1 && !vm.filterCheckbox.value2 && !vm.filterCheckbox.value3 && !vm.filterCheckbox.value4 && !vm.filterCheckbox.value5 && !vm.filterCheckbox.value6 && !vm.filterCheckbox.value7) {
                    if(!status) {
                        status = true;
                    }
                }
                return status;
            } catch(err) {
                return true;
            }
        };
        activeModel.campaigns = vm.campaigns;

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4).notSortable(),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7).notSortable(),
            DTColumnDefBuilder.newColumnDef(8).notSortable()
        ];

        vm.addCampaign = addCampaign;
        vm.editCampaign = editCampaign;
        vm.removeCampaign = removeCampaign;

        vm.checkModel = true;

        vm.includeColour = function(disabledCampaigns){
            alert(disabledCampaigns);
        };

        var t = document.getElementById('whole-body-container').offsetHeight;

        //parent.setHeight('left-sidebar',document.getElementById('whole-body-container').offsetHeight);

        function _buildCampaign2Add(id) {
            return {
                id: id,
                firstName: 'Foo' + id,
                lastName: 'Bar' + id
            };
        }
        function addCampaign() {
            activeModel.campaignFlow = true;
            $location.path('/oi');
          //  vm.campaigns2Add = _buildCampaign2Add(vm.campaigns2Add.id + 1);
        }
        function editCampaign(index) {
            vm.selectedOi = [{
                'campaignIdentification' : {
                    'campaignName' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignName,
                 'campaignDesc' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignDescription,
                    'campaignSchemaGroup' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignSchemaGroup,
                    'campaignSchema' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignSchema,
                 'campaignType' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignType,
                 'campaignFieldNames' : vm.campaigns[index].CampaignDetails.CampaignIdentification.CampaignFieldnames
                }
            }];
            vm.selectionData = [{
                'campaignSelection' :  vm.campaigns[index].CampaignDetails.CampaignSelection
            }];
            vm.scheduledData = [{
                'campaignScheduler' : {
                    'campaignStartDate' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignEndDate,
                 'campaignEndDate' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignEndDate,
                 'campaignStartTime' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignStartTime,
                 'campaignDeliveryMode' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignDeliveryMode,
                 'campaignTemplateType' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignTemplateType,
                 'campaignTemplateId' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignTemplateId,
                 'campaignScheduleType' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignScheduleType,
                 'campaignScheduleTypeValue' : vm.campaigns[index].CampaignDetails.CampaignScheduler.CampaignScheduleTypeValue
                }
            }];
            activeModel.selectedOi = vm.selectedOi;
            activeModel.selectionData = vm.selectionData;
            activeModel.scheduledData = vm.scheduledData;
            vm.campaigns.splice(index, 1, angular.copy(vm.campaigns2Add)); 
            activeModel.campaignFlow = true;
            $location.path('/oi');
        }
        function removeCampaign(index) {
            vm.campaigns.splice(index, 1);
        }

        function sortOn( collection, object ) {
            collection.sort(
                function( a, b ) {
                    if ( a[ object].name <= b[ object].name ) {
                        return( -1 );
                    }
                    return( 1 );
                }
            );
        }


        vm.groupBy = function( attribute ) {
            // First, reset the groups.
            vm.groups = [];
            // Now, sort the collection of friend on the
            // grouping-property. This just makes it easier
            // to split the collection.
            sortOn( vm.campaigns, attribute );

            // I determine which group we are currently in.
            var groupValue = "_INVALID_GROUP_VALUE_";
            for ( var i = 0 ; i < vm.campaigns.length ; i++ ) {
                var campaign = vm.campaigns[ i ];

                if(campaign[attribute].name !== groupValue){

                    var group = {
                        label: campaign[ attribute].name,
                        campaigns: [],
                        labelDesc :  attribute + ":" + campaign[ attribute].name
                    };
                    groupValue = group.label;

                    vm.groups.push(group);

                }
                group.campaigns.push( campaign );
            }




            vm.groupedFriends = _.groupBy(vm.campaigns, "CampaignEnableDisableFlag");
            console.log(vm.groupedFriends )


            var groups = _.groupBy(vm.campaigns, function(value){
                return value.CampaignEnableDisableFlag + '#' + value.CampaignScheduleType;
            });

            var data = _.map(groups, function(group){
                return {
                    CampaignScheduleType: group[0].CampaignScheduleType,
                    CampaignEnableDisableFlag: group[0].CampaignEnableDisableFlag,
                    CampaignDetails: _.pluck(group, 'CampaignDetails')
                }
            });

            console.log(data);
        };

    }

})();

