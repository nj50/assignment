angular.module('weatherApp.services', []); //instantiates
angular.module('weatherApp.services').factory('factoryRef', ['$http', '$q', function($http, $q) { 

    return {
        getData: function(url) {
           return $http.get(url+'&appid=cbdc2dc07061e21e445d7951b03e3188');
    	}
	}
   

}]);
  
