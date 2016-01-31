
angular
.module('PomodoroApp')
.controller('PomodoroController', ['$scope','$rootScope','config', 'constants', 'settings','$interval','$timeout', 'localStorageService', 'notify', 'timer','$cycle',pomodoroController]);

function pomodoroController($scope, $rootScope, config, constants, settings, $interval, $timeout, localStorageService, notify, timer, $cycle) {

    $scope.constants = constants;
    $scope.config = config;
    $scope.isRunning = false;
	$scope.settings = settings.getSettings();
    $scope.cycles = $cycle.list();
    $scope.cyclesSaved = true;
    $scope.time = settings.getPomodoro();

    // function getRemainingCycles(){
    //     return 4 - $scope.cycles.length;
    // }
    $scope.getNumber = function(num) {
         return new Array(num);
     }


    $rootScope.$on("$locationChangeStart", function(event, next, current) {
    	$scope.settings = settings.getSettings();
        $scope.time = settings.getPomodoro();
        $scope.cycles = $cycle.list();
    });

    $scope.start = function(){
        timer.startPomodoro();
        $scope.isRunning = true;
    }

    $scope.startShortBreak = function(){
        timer.startShortBreak();
        $scope.isRunning = true;
    }

    $scope.startLongBreak = function(){
        timer.startLongBreak();
        $scope.isRunning = true;
    }

    $scope.stop = function(){
        timer.cancel();
        $scope.isRunning = false;
    }

    $scope.reset = function(){
        timer.reset();
    }

    timer.onTimeChange(function(time){
        $scope.time = time;
    });
    timer.onPomodoroStop(function(time){
        console.log("Stopped Pomodoro: "+time);
        $scope.isRunning = false;
        notify.success(constants.pomodoro_finished);
        $scope.startShortBreak();
        $scope.addPomodoro(time);

    });
    timer.onShortBreakStop(function(time){
        console.log("Stopped Short Break: "+time);
        $scope.isRunning = false;
        notify.success(constants.short_break_finished);
        $scope.addShortBreak(time);
    });

    var pomodoroTime;
    $scope.addPomodoro = function(time){
        pomodoroTime = time;
    }
    $scope.addShortBreak = function(breakTime){
        var cycle = {
            pomodoro: pomodoroTime,
            break: breakTime,
        }
        $scope.cycles.push(cycle);
        $scope.cyclesSaved = false;
        // $scope.cycles[$scope.cycles.length-1].break = time;
    }

    $scope.removePomodoro = function(){
    	//$scope.pomodoroList.splice(index, 1);
    }

    $scope.saveCycles = function(){

        //$scope.cyclesSaved = true;
    }

    $scope.$watch('cycles', function(obj, listener) {
        $cycle.set($scope.cycles);
   }, true);

}
