class VehiclesService {
	constructor (VEHICLES_DATA, $q) {
		this.$q = $q;
		this.VEHICLES_DATA = VEHICLES_DATA;
	}

	getAll () {
		let deferred = this.$q.defer();
		setTimeout( () => {
			deferred.resolve(angular.copy(this.VEHICLES_DATA));
		}, 100);
		return deferred.promise;
	}

	static factory (VEHICLES_DATA, $q) {
		return new VehiclesService(VEHICLES_DATA, $q);
	}
}

VehiclesService.factory.$inject = ['VEHICLES_DATA', '$q'];

export default VehiclesService;
    	
