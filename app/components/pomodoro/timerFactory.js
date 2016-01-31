
angular.module('PomodoroApp').factory('timer', [ 'config','constants', 'localStorageService', 'settings','$interval', function (config, constants, localStorageService, settings, $interval) {

	var Timer = function(){
		this.settings;
        this.counter;
        this.time;
        this.interval = $interval;
    	this.currentRunType;
		this.isRunning = false;
        self = this;

		/*
		* Callbacks
		*/
		this.onPomodoroStopCallback;
		this.onShortBreakStopCallback;
		this.onTimeChangeCallback;
		this.onStopCallback;

    	/*
    	* Constants
    	*/
    	POMODORO = "POMODORO";
    	SHORT_BREAK = "SHORT_BREAK";
    	LONG_BREAK = "LONG_BREAK";

    	this.startPomodoro = function(){
			this.settings = settings.getSettings();
    		this.currentRunType = POMODORO;

    		this.defaultMin = this.settings.pomodoro;
    		this.defaultSec = 0;
    		this.min = this.settings.pomodoro;
    	    this.sec = 0;

    	    this.runTimer();

    	};

    	this.startShortBreak = function(){
			this.settings = settings.getSettings();
    		this.currentRunType = SHORT_BREAK;

    		this.defaultMin = this.settings.shortBreak;
    		this.defaultSec = 0;
    		this.min = this.settings.shortBreak;
    	    this.sec = 0;

    	    this.runTimer();
    	};

    	this.startLongBreak = function(){
			this.settings = settings.getSettings();
    		this.currentRunType = LONG_BREAK;

    		this.defaultMin = this.settings.longBreak;
    		this.defaultSec = 0;
    		this.min = this.settings.longBreak;
    		this.sec = 0;

    		this.runTimer();
    	};

    	this.runTimer = function(){
			console.log(this.currentRunType);
    		this.reset();
			this.isRunning = true;
    		this.counter = this.interval(function(){
    			self.count();
    		}, 1000);
    	};

    	this.cancel = function(){
    	  this.interval.cancel(this.counter);
    	  this.setTime();
		  this.isRunning = false;
    	};

		this.reset = function(){
    	  this.interval.cancel(this.counter);
    	  this.min = this.defaultMin;
    	  this.sec = this.defaultSec;
    	  this.setTime();
		  this.isRunning = false;
    	};

    	this.cancelWhenFinish = function(){
    	  	if(this.min === 0 && this.sec === 0){

				this.interval.cancel(this.counter);
				this.isRunning = false;

    			this.handleCallbacks();
    		}

    	};

    	this.count = function(){

    	  	this.updateSec();
    		if(this.sec == 59){
    			this.updateMin();
    		}
    		this.setTime();
    		this.cancelWhenFinish();
    	};

    	this.setTime = function(){

			var minString = this.min;
			if(this.min.toString().length == 1)
				minString = "0" + this.min;

			var secString = this.sec;
			if(this.sec.toString().length == 1)
				secString = "0" + this.sec;

    	  	this.time = minString + ":" + secString;

			if(this.onTimeChangeCallback)
				this.onTimeChangeCallback(this.time);
    	};

    	this.updateMin = function(){
    	    	this.min--;
    	    	if(this.min == -1)
    	    		this.min = 59;
    	};

    	this.updateSec = function(){
    		this.sec--;
    		if(this.sec == -1)
    			this.sec = 59;
    	};

    	this.onTimeChange = function(callback){
    		this.onTimeChangeCallback = callback;
    	};

		this.onPomodoroStop = function(callback){
    		this.onPomodoroStopCallback = callback;
    	};
		this.onShortBreakStop = function(callback){
			this.onShortBreakStopCallback = callback;
		};

		this.onStop = function(callback){
    		this.onStopCallback = callback;
    	};

		this.handleCallbacks = function(){
			if(this.onPomodoroStopCallback && this.currentRunType == POMODORO && !this.isRunning)
				this.onPomodoroStopCallback(this.defaultMin);

			if(this.onShortBreakStopCallback && this.currentRunType == SHORT_BREAK && !this.isRunning)
				this.onShortBreakStopCallback(this.defaultMin);
		}

    }

    return new Timer();
}]);
