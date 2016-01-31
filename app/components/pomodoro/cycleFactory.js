
angular.module('PomodoroApp').factory('$cycle', [ 'config','constants', 'localStorageService', '$data', function (config, constants, localStorageService, $data) {

	var Cycle = function(){

		this.list = function(){
		    var data = $data.getData();
		    return data.cycles;
		};
		this.set = function(cycles){
		    var data = $data.getData();
        	data.cycles = cycles;
			return $data.setData(data);
		};
		this.add = function(cycle){
		  	var data = $data.getData();
		  	data.cycles.push(cycle);
			return $data.setData(data);
		};
	}
    return new Cycle();
}]);
