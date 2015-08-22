class GarageController {

	constructor (GARAGE_SPECS, Vehicles, Parking, Pagination, $filter) {
		this.parkingFactory = Parking;
		this.vehiclesFactory = Vehicles;
		this.paginationFactory = Pagination;
		this.$filter = $filter;

		this.parkingData;
		this.filteredData; 
		this.tableData;
		
		this.parkingSpacesPerLevel = GARAGE_SPECS.parkingSpacesPerLevel;
		this.vehicleTypes = GARAGE_SPECS.vehicleTypes;
		this.levelsRange = this.getLevelsRange(GARAGE_SPECS.levels); 

		this.searchQuery = "";
		this.menuOpen = false;
		this.showSimulation = true;
		this.filterCriterias = {};

		Parking.getAllVehicles().then( (parkingData) => {
			this.parkingData = parkingData;
			this.filteredData = this.parkingData; 
			Pagination.setPaginationParams(this.getTotalFilteredVehicles());
			this.setTableData();
		});
	}

	toggleMenuOpen () {
		this.menuOpen = !this.menuOpen;
	}

	emptySearchQuery () {
		this.searchQuery = "";
	}

	capitalize (stringToCapitalize) {
		return ( stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1) );
	}

	getLevelsRange (levels) {
		let levelsRange = new Array();
		for (let i = 1; i <= levels; i++) {
			levelsRange.push(i);
		}
		return levelsRange;
	}

	getTotalFilteredVehicles () {
		if (this.filteredData !== undefined) {
			return this.filteredData.length;
		}
	}

	goToPage (pageToGo) { 
		this.paginationFactory.changePage(pageToGo);
		this.setTableData();
	}

	isFilterActive (criteria, value) {
		return (this.filterCriterias[criteria] && this.filterCriterias[criteria].indexOf(value)!==-1);
	}

	updateFilterCriteria (criteria, value) {
		if ( !this.filterCriterias[criteria] ) {
			this.filterCriterias[criteria] = new Array();
		}
		
		let filterCriteria = this.filterCriterias[criteria];
		
		let indexForValue = filterCriteria.indexOf(value); 
		if (indexForValue === -1) {
			filterCriteria.push(value);
		} else {
			filterCriteria.splice(indexForValue, 1);
			if (filterCriteria.length === 0) {
				delete this.filterCriterias[criteria];
			}
		}
	} 

	updateTable (criteria, value) {
		if ( arguments.length == 2 ) {
			this.updateFilterCriteria(criteria, value);
		}
		this.filterRows();
		this.paginationFactory.setPaginationParams(this.getTotalFilteredVehicles());
		this.setTableData();
	}

	filterRows () {
		let data = this.$filter('filter')(
			this.parkingData,
			(row,rowIndex) => {
				let rowMatch = true;
				Object.keys(this.filterCriterias).forEach( (filterCriteria) => { 
					if ( this.filterCriterias[filterCriteria].indexOf(row[filterCriteria]) === -1) {
						rowMatch = false;
					}
				});
				if (rowMatch && this.searchQuery!=='') {
					if ( !row.licensePlate.toLowerCase().contains(this.searchQuery.toLowerCase()) ) {
						rowMatch = false;
					}
				}
				return rowMatch;
			},
			false
		);
		this.filteredData = data;
	}

	setTableData () {
		let rowsRange = this.paginationFactory.getRowLimitsForPage(); 
		this.tableData = this.filteredData.slice(rowsRange.first - 1, rowsRange.last);
	}

	runSimulation() {
		this.showSimulation = false;
		let simulationSteps = [
			{action: "enter", indexes: [0,1,2,3,4]},
			{action: "leave", indexes: [1,3]},
			{action: "enter", indexes: [5,6,7,8,9]},
			{action: "leave", indexes: [2,6,9]}
		];
		let timeout = 0;
		let timeBetweenVehiclesMove = 1000; //ms 
		this.vehiclesFactory.getAll().then( (vehicles) => {
			simulationSteps.forEach( (simulationStep) => {
				let vehiclesSelection = new Array();
				for (let i=0; i<vehicles.length; i++) {
					if (simulationStep.indexes.indexOf(i) !== -1) {
						vehiclesSelection.push(vehicles[i]);
					}
				}
				vehiclesSelection.forEach( (vehicle) => {
					timeout += timeBetweenVehiclesMove;
					if (simulationStep.action === "enter") {
						setTimeout( () => this.enterGarage(vehicle), timeout);
					} else {
						setTimeout( () => this.leaveGarage(vehicle.licensePlate), timeout);
					}
				});
			});
		});
	}

	enterGarage (vehicle) {
		this.parkingFactory.getFreeSpace().then(
			(parkingSpace) => {
				let parkingDetails = {
					licensePlate: vehicle.licensePlate,
					type: vehicle.type,
					level: parkingSpace.level,
					slot: parkingSpace.slot
				};
				this.parkingFactory.insertVehicle(parkingDetails).then(
					() => {
						this.parkingFactory.getAllVehicles().then( (parkingData) => {
							this.parkingData = parkingData;
							this.updateTable();
							console.log('Vehicle entered parking: ', JSON.stringify(parkingDetails));
							console.log('Occupancy: ', this.parkingData.length);
							this.parkingFactory.deleteFreeSpace(parkingSpace).then(
								() => {},
								() => { 
									console.error('Parking space could not be removed from free spaces'); 
								}
							);
						});			
					},
					() => {
						console.error("Vehicle could not enter to parking.");
					}
				);
			},
			() => { 
				console.error("We are sorry, but the parking is currently full.");
			}
		);
	}

	leaveGarage (licensePlate) {
		this.parkingFactory.getVehicle(licensePlate).then( 
			(parkingDetails) => {
				this.parkingFactory.deleteVehicle(licensePlate).then(
					() => {
						this.parkingFactory.getAllVehicles().then( (parkingData) => {
							this.parkingData = parkingData;
							this.updateTable();
							console.log('Vehicle left parking: ', licensePlate);
							console.log('Occupancy: ', this.parkingData.length);
							this.parkingFactory.insertFreeSpace(parkingDetails.level, parkingDetails.slot).then(
								() => {},
								() => { 
									console.error('Parking space could not be added to free spaces');
								}
							);
						});
					},
					() => {
						console.error('Vehicle could not leave the parking');
					}
				);
			},
			() => {
				console.error('There is no vehicle in the garage with license plate ', licensePlate);
			}
		);	
	}

}

GarageController.$inject = ['GARAGE_SPECS', 'Vehicles', 'Parking', 'Pagination', '$filter'];

export default GarageController;