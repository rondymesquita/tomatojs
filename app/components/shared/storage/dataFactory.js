
angular.module('PomodoroApp').factory('$data', [ 'config','constants', 'localStorageService', function (config, constants, localStorageService) {

  var Data = function(){

    this.getData = function(){
      	var data = localStorageService.get(constants.data_key)
    	return data;
    };

    this.setData = function(data){
      return localStorageService.set(constants.data_key, data);
    };

    var data = this.getData();
    if(!data){
        this.setData(config.defaultData);
    }

  }



    return new Data();
}]);
