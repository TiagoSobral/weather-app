export class Location {
	constructor(location, current, forecast) {
		this.location = location;
		this.current = current;
		this.forecast = forecast;
	}
}

export class CurrentWeather {
	constructor(temperature, condition, high, low) {
		this.temperature = temperature;
		this.condition = condition;
		this.high = high;
		this.low = low;
	}
}
