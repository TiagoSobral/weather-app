export class Location {
	constructor(location, current, forecast, hourly) {
		this.location = location;
		this.current = current;
		this.forecast = forecast;
		this.hourly = hourly;
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
	constructor(date, conditions, high, low) {
		this.date = date;
		this.conditions = conditions;
		this.high = high;
		this.low = low;
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
