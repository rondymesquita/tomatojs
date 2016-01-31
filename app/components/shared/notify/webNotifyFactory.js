angular.module('PomodoroApp').factory('webNotify', ['webNotification', 'constants', 'settings' ,function (webNotification, constants, settings) {

	function showWebNotification(title, text){
		webNotification.showNotification(title, {
                    body: text,
                    icon: '../bower_components/HTML5-Desktop-Notifications/alert.ico',
                    onClick: function onNotificationClicked() {
                        window.alert('Notification clicked.');
                    },
                    autoClose: 4000 //auto close the notification after 2 seconds (you manually close it via hide function)
                }, function onShow(error, hide) {
                    if (error) {
                        window.alert('Unable to show notification: ' + error.message);
                    } else {
                        setTimeout(function hideNotification() {
                            console.log('Hiding notification....');
                            hide(); //manually close the notification (or let the autoClose close it)
                        }, 5000);
                    }
                });
	};

    return {
        success: function (text) {
            showWebNotification(constants.success, text)
        },
        error: function (text) {
            showWebNotification(constants.error, text)
        }
    };
}]);
