class GarageSpecsService {
	constructor () {
		this.levels = 3;
		this.parkingSpacesPerLevel = 7;
		this.vehicleTypes = ['car', 'motorbike'];
	}

	static constant () {
		return new GarageSpecsService();
	}
}

export default GarageSpecsService;

