angular.module('PomodoroApp').factory('notify', ['webNotify', 'toastNotify','$mdToast','constants', 'settings' ,function (webNotify, toastNotify, $mdToast, constants, settings) {

	function mdNotify(text){
		$mdToast.show(
		  	$mdToast.simple()
			.content(text)
				.action('ok')
				.position("bottom right")
				.hideDelay(6000)
		);
	}

    return {
        success: function (text) {
			var notificationType = settings.getSettings().notification;
			if(notificationType == "web")
            	webNotify.success(text);
			else
				//toastNotify.success(text);
				mdNotify(text);

        },
        error: function (text) {
			var notificationType = settings.getSettings().notification;
			if(notificationType == "web")
            	webNotify.error(text);
			else
				//toastNotify.error(text);
				mdNotify(text);
        }
    };
}]);
