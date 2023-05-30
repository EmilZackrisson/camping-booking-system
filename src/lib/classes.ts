class Vehicle {
	regNr: string;
	length: number;
	type: string;
	constructor(regNr: string, length: number, type: string) {
		this.regNr = regNr;
		this.length = length;
		this.type = type;
	}
}

export { Vehicle };
