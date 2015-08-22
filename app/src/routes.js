var routes = function ($stateProvider, $urlRouterProvider) {
	var baseUrl =  '/src/views';

	var garage = {
		url: '/garage',
		templateUrl: `${baseUrl}/garage/garage.html`,
		controller: 'GarageController',
		controllerAs: 'garageCtrl'
	};

 
	$stateProvider
		.state('garage', garage);

 
	$urlRouterProvider
		.otherwise('/garage');

};

export default routes;
