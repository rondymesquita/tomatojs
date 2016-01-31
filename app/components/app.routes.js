angular.module('PomodoroApp').config(config);

function config($routeProvider) {
    $routeProvider

    .when('/pomodoro', {
        templateUrl : './app/components/pomodoro/pomodoroView.html',
        controller  : 'PomodoroController'
    })
    .when('/settings', {
        templateUrl : './app/components/settings/settingsView.html',
        controller  : 'SettingsController'
    })
    .when('/download', {
        templateUrl : './app/components/download/downloadView.html',
        controller  : 'DownloadController'
    })
    .otherwise({
        templateUrl : './app/components/pomodoro/pomodoroView.html',
    });

}
