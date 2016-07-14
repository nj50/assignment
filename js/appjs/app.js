var app = angular.module('weatherApp', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
	$stateProvider
		.state("main",
			{ 
				url: "",
				views: {
			        "main": { templateUrl : "templates/report.html"  }
			    }
			}
		);
	}
]);



		
app.factory('factoryRef', ['$http', '$q',
    function($http, $q) {
        return {
            getData: function(url) {
               return $http.get(url+'&appid=cbdc2dc07061e21e445d7951b03e3188');
        	}
   		}
   	}
]);


//------------
app.controller('weatherController', ['factoryRef','$state', function (factoryRef,$state) {
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

app.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});


app.directive('weatherWidget', function() {
	return {
		restrict : 'E',
		replace : true,
		controller:'weatherController',
		controllerAs: "wctrl",
		templateUrl:'templates/weatherWidget.html'
	}
});







