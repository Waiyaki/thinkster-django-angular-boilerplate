// LoginController

(function() {
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
			.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication'];

	function LoginController($location, $scope, Authentication) {
		var vm = this;
		vm.login = login;

		activate(); // Actions to be perfomed when this controller is instantiated.

		function activate() {
			// If the user is authenticate, they should not be here.
			if(Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		// login: Log users in.
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();