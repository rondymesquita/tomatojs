
angular
.module('PomodoroApp')
.controller('SettingsController', ['$scope','$rootScope','config', 'constants','settings', '$interval','$timeout', 'notify', settingsController]);

function settingsController($scope, $rootScope, config, constants, settings, $interval, $timeout, notify) {

	$scope.settings = settings.getSettings();

	$scope.saveSettings = function(){
		var result = settings.setSettings($scope.settings);
		if(result){
			notify.success(constants.settings_saved);
		}else{
			notify.error(constants.settings_saving_error);
		}
	}




}
