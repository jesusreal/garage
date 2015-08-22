class VehiclesDataService {
	constructor () {
		this.vehicles = [
			{licensePlate: "P - X 359", type: "car"},
			{licensePlate: "L - U 134", type: "motorbike"},
			{licensePlate: "SE - OB 485", type: "car"},
			{licensePlate: "KW - L 853", type: "car"},
			{licensePlate: "HA - V 231", type: "car"},
			{licensePlate: "BO - L 668", type: "motorbike"},
			{licensePlate: "UL - L 1384", type: "car"},
			{licensePlate: "WO - V 765", type: "car"},
			{licensePlate: "DW - L 2228", type: "motorbike"},
			{licensePlate: "FO - X 8534", type: "car"}
			// {licensePlate: "AF - U 3832", type: "motorbike"},
			// {licensePlate: "DO - OB 45", type: "car"},
			// {licensePlate: "GI - L 63", type: "car"},
			// {licensePlate: "CI - V 71", type: "car"},
			// {licensePlate: "CO - L 86", type: "motorbike"},
			// {licensePlate: "DFE - D 453", type: "car"},
			// {licensePlate: "LE - E 35", type: "car"}
		]
	}

	static value () {
		return new VehiclesDataService();
	}
}

export default VehiclesDataService;


