export class Location {
	constructor(location) {
		this.location = location;
	}
}

export class CurrentWeather {
	constructor(temperature, currentCondition, upcomingCondition, high, low) {
		this.temperature = temperature;
		this.currentCondition = currentCondition;
		this.upcomingCondition = upcomingCondition;
		this.high = high;
		this.low = low;
	}
}

export class DailyWeather {
	constructor(date, conditions, low, high) {
		this.date = date;
		this.conditions = conditions;
		this.low = low;
		this.high = high;
	}
}

export class HourlyWeather {
	constructor(hours, conditions, temperature) {
		this.hours = hours;
		this.conditions = conditions;
		this.temperature = temperature;
		// this.sunrise = sunrise;
		// this.sunset = sunset;
	}
}
