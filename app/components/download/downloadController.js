
angular
.module('PomodoroApp')
.controller('DownloadController', ['$scope','$rootScope','config', 'constants','settings', '$interval','$timeout', 'notify', '$data', downloadController]);

function downloadController($scope, $rootScope, config, constants, settings, $interval, $timeout, notify, $data) {

	$scope.data = JSON.stringify($data.getData());

}
