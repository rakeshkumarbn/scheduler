/**
 * Created by Z179536 on 10/7/2015.
 */

'use strict';

// making a central factory for errors, easier to handle error messages
angular.module('csi.common')
    .factory('activeModel', [function () {

        var activeModel = {};

        activeModel = {
            userId : '',
            role : '',
            authenticated:false,
            userContact:'',
            passwd:'',
            campaignFlow: false,
            selectedOi : [],
            selectionData : [],
            scheduledData : [],
            customTemplate : []
        };

        return activeModel;

    }]);