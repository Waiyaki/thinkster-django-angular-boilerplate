(function(){
    'use strict';

    angular.module('thinkster.profiles.controllers')
        .controller('ProfileSettingsController', [
            '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar',
            function($location, $routeParams, Authentication, Profile, Snackbar){
                var vm = this;

                vm.destroy = function(){
                    Profile.destroy(vm.profile).then(function(data, status, headers, config){
                        Authentication.unauthenticate();
                        Snackbar.show('Your account has been deleted');
                        window.location = '/';
                    }, function(data, status, headers, config){
                        Snackbar.error(data.error);
                    });
                };

                vm.update = function(){
                    Profile.update(vm.profile).then(function(data, status, headers, config){
                        Snackbar.show('Your profile has been successfully updated.');
                        $location.path('/+' + vm.profile.username);
                    }, function(data, status, headers, config){
                        Snackbar.error(data.error);
                    });
                };

                function activate(){
                    var authenticatedAccount = Authentication.getAuthenticatedAccount();
                    var username = $routeParams.username.substr(1);

                    // Redirect the users if they are not logged in
                    if(!authenticatedAccount){
                        $location.path('/');
                        Snackbar.error('You are not authorised to view this page');
                    }
                    else {
                        if(authenticatedAccount.username !== username){
                            // Redirect if the user is logged in but doesn't own this profile
                            Snackbar.error('You are not authorised to view this page');
                            $location.path('/');
                        }
                    }

                    Profile.get(username).then(function(data, status, headers, config){
                        vm.profile = data.data;
                    }, function(data, status, headers, config){
                        $location.path('/');
                        Snackbar.error("That user doesn't exist");
                    });
                }

                activate();
            }]);
})();
