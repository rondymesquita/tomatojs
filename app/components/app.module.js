angular
.module('PomodoroApp', ['ngRoute','ngMaterial','LocalStorageModule','angular-web-notification'])
.run(['$rootScope',run]).config(configuration);

function run($rootScope, $data){
    console.log("loaded");
};

function configuration($httpProvider,$mdThemingProvider,localStorageServiceProvider){

    $httpProvider.interceptors.push(interceptor);


    $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink');

    localStorageServiceProvider
    .setPrefix('PomodoroApp')
    .setStorageType('localStorage') // localStorage,sessionStorage
    .setNotify(true, true)
}


var interceptor = function ($q, $location, constants) {
    return {
        request: function (request) {
            return request;
        },

        response: function (result) {
            // console.log('Repos:');
            // result.data.splice(0, 10).forEach(function (repo) {
            //     console.log(repo.name);
            // })
            // console.log("Result");
            // console.log(result);
            return result;
        },

        responseError: function (rejection) {
            // console.log('Failed with', rejection.status, 'status');
            // if (rejection.status == 403) {
            //     $location.url('/login');
            // }
            // console.log("Error");
            console.log(rejection);
            return $q.reject(rejection);
        }
    }
};


function ResponseData(message, status){
    this.message = message;
    this.status = status;
}
