
angular.module('weatherApp.Controllers', []); //instantiates
angular.module('weatherApp.Controllers')      //gets
.controller('weatherControllers', ['factoryRef','$state', function(factoryRef,$state) {

var vm = this;
	vm.weather ={};
	vm.getWeather  = function() {
		$state.go("main",{});



		var city = vm.weather.city;
		factoryRef.getData('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&cnt=7').then(function(response) {
			console.log("response",response)
			//Verify we get response
			if(response.data && response.data.cod ==200){
				vm.weatherReport ={};//Reset
				vm.weatherReport = response.data;
			}else{
				vm.weatherReport ={};//Reset
				vm.weatherReport.error = response.data.message;
			}
		});
	}
	
    vm.toggleDetail = function($index) {
        vm.activePosition = vm.activePosition == $index ? -1 : $index;
	}
}]);
