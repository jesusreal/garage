class ParkingService {
	constructor (PARKING_DATA, $q) {
		this.$q = $q;
		this.vehicles = PARKING_DATA.vehicles;
		this.freeSpaces = PARKING_DATA.freeSpaces;
	}

	getAllVehicles () {
		let deferred = this.$q.defer();
		setTimeout( () => {
			deferred.resolve(angular.copy(this.vehicles));
		}, 10);
		return deferred.promise;
	}

	getVehicle (licensePlate) {
		let vehicle;
		let deferred = this.$q.defer();
		for (let i=0; i<this.vehicles.length; i++) {
			let licensePlateMatch = (this.vehicles[i].licensePlate === licensePlate);
			if (licensePlateMatch) {
				vehicle = this.vehicles[i];
				break;
			}
		}
		setTimeout( () => {
			if ( vehicle !== undefined ) {
				deferred.resolve(vehicle);
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;
	}

	insertVehicle (parkingDetails) {
		let deferred = this.$q.defer();
		let totalVehiclesInGarageBeforeInsert = this.vehicles.length;
		let totalVehiclesInGaraceAfterInsert = this.vehicles.push(parkingDetails);
		setTimeout( () => {
			let insertSuccessful = (totalVehiclesInGaraceAfterInsert === totalVehiclesInGarageBeforeInsert+1);
			if (insertSuccessful) {
				deferred.resolve();
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;
	}
	
	deleteVehicle (licensePlate) {
		let deferred = this.$q.defer();
		let result;
		for (let i=0; i<this.vehicles.length; i++) {
			let licensePlateMatch = (this.vehicles[i].licensePlate === licensePlate);
			if (licensePlateMatch) {
				result = this.vehicles.splice(i,1);
				break;
			}
		}
		setTimeout( () => {
			let removeSuccessful = (result!==undefined && result.length===1 );
			if (removeSuccessful) {
				deferred.resolve();
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;
	}

	insertFreeSpace (level, slot) {
		let deferred = this.$q.defer();
		let totalFreeSpacesBeforeInsert = this.freeSpaces.length;
		let totalFreeSpacesAfterInsert = this.freeSpaces.push({level:level, slot:slot});
		setTimeout( () => {
			let insertSuccessful = (totalFreeSpacesAfterInsert === totalFreeSpacesBeforeInsert+1);
			if (insertSuccessful) {
				console.log("ParkingService::insertFreeSpace. Total free spaces" , this.freeSpaces.length)
				deferred.resolve();
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;
	}

	getFreeSpace () {
		let deferred = this.$q.defer();
		setTimeout( () => {
			if ( this.freeSpaces.length > 0 ) {
				deferred.resolve(this.freeSpaces[0]);
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;
	}

	deleteFreeSpace (parkingSpace) {
		let deferred = this.$q.defer();
		let result;
		for (let i=0; i<this.freeSpaces.length; i++) {
			let levelMatch = (this.freeSpaces[i].level === parkingSpace.level);
			let slotMatch = (this.freeSpaces[i].slot === parkingSpace.slot);
			if (levelMatch && slotMatch) {
				result = this.freeSpaces.splice(i,1);
				break;
			}
		}
		setTimeout( () => {
			let removeSuccessful = (result!==undefined && result.length===1 );
			if (removeSuccessful) {
				console.log("ParkingService::deleteFreeSpace. Total free spaces" , this.freeSpaces.length)
				deferred.resolve();
			} else {
				deferred.reject();
			}
		}, 100);
		return deferred.promise;

	}

	static factory (PARKING_DATA, $q) {
		return new ParkingService(PARKING_DATA, $q);
	}
}

ParkingService.factory.$inject = ['PARKING_DATA', '$q'];

export default ParkingService;
		
