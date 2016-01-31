
angular.module('PomodoroApp').factory('settings', [ 'config','constants', 'localStorageService', '$data', function (config, constants, localStorageService, $data) {

  var Settings = function(){

    this.getSettings = function(){
        // var savedSettings = localStorageService.get(constants.settings_key)
        // if(!savedSettings)
        // 	savedSettings = config.settings;
        //
        // return savedSettings;
        var data = $data.getData();
        if(data && data.settings){
            return data.settings;
        }
    };

    this.setSettings = function(settings){
      //return localStorageService.set(constants.settings_key, settings);
      var data = $data.getData();
      data = {
          settings:settings
      }
      return $data.setData(data);
    };

    this.getPomodoro = function(){
        // var savedSettings = localStorageService.get(constants.settings_key)
        // if(!savedSettings)
    	// 	savedSettings = config.settings;
        //
        // var minString = savedSettings.pomodoro;
        // if(savedSettings.pomodoro.toString().length == 1)
        //     minString = "0" + savedSettings.pomodoro;
        //
        // return minString + ":00";
        var data = $data.getData();
        if(data && data.settings){
            settings = data.settings;
            var minString = settings.pomodoro;
            if(settings.pomodoro.toString().length == 1)
                minString = "0" + settings.pomodoro;
            return minString + ":00";
        }
    };

  }
    return new Settings();
}]);
