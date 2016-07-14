var app = angular.module('weatherApp', ['ui.router','weatherApp.Controllers','weatherApp.services']);
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
		controller:'weatherControllers',
		controllerAs: "wctrl",
		templateUrl:'templates/weatherWidget.html'
	}
});







