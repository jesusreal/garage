class ParkingDataService {
	constructor () {
		this.vehicles = [
			{licensePlate: "M - U 683", type: "motorbike", level:1, slot:"2"},
			{licensePlate: "F - OB 1456", type: "car", level:1, slot:"3"},
			{licensePlate: "A - L 823", type: "car", level:1, slot:"4"},
			{licensePlate: "CA - L 8", type: "motorbike", level:1, slot:"6"},
			{licensePlate: "LO - L 84", type: "car", level:1, slot:"7"},
			{licensePlate: "PI - V 715", type: "car", level:2, slot:"1"},
			{licensePlate: "TN - X 434", type: "car", level:2, slot:"3"},
			{licensePlate: "S - U 383", type: "motorbike", level:2, slot:"4"},
			{licensePlate: "Z - OB 145", type: "car", level:2, slot:"5"},
			{licensePlate: "W - L 863", type: "car", level:2, slot:"6"},
			{licensePlate: "KC - L 86", type: "motorbike", level:3, slot:"1"},
			{licensePlate: "ME - V 471", type: "car", level:3, slot:"2"},
			{licensePlate: "JQ - L 228", type: "motorbike", level:3, slot:"4"},
			{licensePlate: "M - X 683", type: "car", level:3, slot:"5"},
			{licensePlate: "IO - V 671", type: "car", level:3, slot:"7"}
		];
		this.freeSpaces = [
			{level:1, slot:"1"},
			{level:1, slot:"5"},
			{level:2, slot:"2"},
			{level:2, slot:"7"},
			{level:3, slot:"3"},
			{level:3, slot:"6"}
		];
	}

	static value () {
		return new ParkingDataService();
	}
}

export default ParkingDataService;

