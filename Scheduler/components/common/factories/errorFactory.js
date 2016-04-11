/**
 * Created by Z179536 on 10/1/2015.
 */
'use strict';

// making a central factory for errors, easier to handle error messages
angular.module('fmt.shared')
    .factory('errors', [function () {
        var errors = [

            /* ***********common error handling for specific status codes************** */
            {
                "errorCode": "001",
                "errorMessage": "The Password and/or Email Address you entered are not valid. Please Try Again or "+
                                "use Forgot Password to reset your  password. Please note that passwords "+
                                "must be at least 7 characters long and include at least 1 letter and 1 number."
            },
            {
                "errorCode": "002",
                "errorMessage": "Service not avaiable. Please try again later"
            },
            {
                "errorCode": "003",
                "errorMessage": "No Clinics Found"
            },
            {
                "errorCode": "004",
                "errorMessage": "Please enter a valid access code"
            }

        ];

        errors.getErrorMessage = function (errorNumber) {
            var message = "";
            angular.forEach(errors, function (value, key) {
                if (errorNumber == value.errorCode)
                    message = value.errorMessage;
            });

            if(message===""){
                message = "We were unable to process your request.";
            }
            return message;
        };

        return errors;

    }]);
