import GarageSpecsService from './services/garageSpecsService.js'
import VehiclesDataService from './services/vehiclesDataService.js'
import VehiclesService from './services/vehiclesService.js'
import ParkingDataService from './services/parkingDataService.js'
import ParkingService from './services/parkingService.js'
import PaginationService from './services/paginationService.js'
import GarageController from './views/garage/garageCtrl.js'
import routes from './routes.js'

angular
	.module('TheGarage', ['ui.router'])
	.constant("GARAGE_SPECS", GarageSpecsService.constant())
	.value("VEHICLES_DATA", VehiclesDataService.value().vehicles)
	.value("PARKING_DATA", ParkingDataService.value())
	.factory("Vehicles", VehiclesService.factory)
	.factory("Parking", ParkingService.factory)
	.factory("Pagination", PaginationService.factory)
	.controller('GarageController', GarageController)
	.config(routes);    	



