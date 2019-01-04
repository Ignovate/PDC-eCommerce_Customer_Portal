export class LocalStore {
	
	private static jsonStore:any = {};

	static get(property:string){
		console.log(property, this.jsonStore[property]);
		console.log(property,"valuessssssssssss",this.jsonStore[property])
		return this.jsonStore[property];
	}

	static getAndRemove(property:string){
		console.log(property, this.jsonStore[property]);
		let value = this.jsonStore[property];
		if(value)
			delete this.jsonStore[property];
		return value;
	}

	static add(property:string, value){
		this.jsonStore[property] = value;
		console.log(property,value,"value")
	}

	static remove(property:string){
		delete this.jsonStore[property];
	}

	static getJson(property:string){
		let jsonValue = this.jsonStore[property];
		// console.log(property, jsonValue);
		if(jsonValue) {
			return JSON.parse(jsonValue);
		}
		return null;
	}

	static addJson(property:string, value){
		const jsonValue = JSON.stringify(value);
		this.jsonStore[property] = jsonValue;
	}
	
}