import {
	CurrentWeather,
	DailyWeather,
	HourlyWeather,
	Location,
} from './classes';
import { retrieveCurrent, retrieveForecast, retrieveHourly } from './data';

const getWeatherFrom = async function getLocationWeather(location, unit) {
	// fetches three types of data, current conditions, hourly and daily

	const current = await retrieveCurrent(location, unit);
	const hourly = await retrieveHourly(location, unit);
	const forecast = await retrieveForecast(location, unit);

	return { current, hourly, forecast };
};

const getCurrentData = function getLocationWeatherData(data) {
	// debugger;
	let weather = data;
	// current day is 0 because json comes in an array of days so 0 is the current day.
	let currentDay = 0;

	let temperature = weather.currentConditions.temp;
	let condition = weather.currentConditions.conditions;
	let upcomingCondition = weather.days[currentDay].description;

	let highTemp = weather.days[currentDay].tempmax;
	let lowTemp = weather.days[currentDay].tempmin;

	const current = new CurrentWeather(
		temperature,
		condition,
		upcomingCondition,
		highTemp,
		lowTemp
	);

	return { current };
};

const getForecastData = function getWeatherForecast(dataForecast) {
	// debugger;
	let nextSevenDays = dataForecast.days;
	let forecast = [];

	// it will return only 7 days of forecast instead of all of them.
	for (let day = 0; day < 8; day++) {
		let currentDay = nextSevenDays[day];

		let dayInfo = new DailyWeather(
			currentDay.datetime,
			currentDay.icon,
			currentDay.tempmin,
			currentDay.tempmax
		);

		forecast.push(dayInfo);
	}

	return { forecast };
};

const getHourlyData = function getWeatherHourly(hourlyData) {
	// debugger;
	let nextHours = filterHours(hourlyData);

	let hours = nextHours.map((hour) => {
		let currentHour = hour;

		let hourInfo = new HourlyWeather(
			currentHour.datetime,
			currentHour.icon,
			currentHour.temp
		);

		return hourInfo;
	});

	return { hours };
};

export const locationWeather = async function groupedData(
	weatherLocation,
	unit = 'metric'
) {
	// debugger;
	const weatherData = await getWeatherFrom(weatherLocation, unit);
	const address = weatherData.current.resolvedAddress;

	// filter data to feed to the functions that are expecting specific type of data.
	const dailyData = weatherData.forecast;
	const currentData = weatherData.current;
	const hourlyData = weatherData.hourly;

	const currentWeather = getCurrentData(currentData);
	const forecastWeather = getForecastData(dailyData);
	const hourlyWeather = getHourlyData(hourlyData);

	const location = new Location(address);

	// object.assign to avoid tightly coupled and using composition.
	const weather = Object.assign(
		location,
		currentWeather,
		hourlyWeather,
		forecastWeather
	);

	console.log(weather);

	return weather;
};

const filterHours = function filterHoursWhenSpreadTwoDays(hourlyData) {
	// hours come from json separated by days
	let upcomingHours = hourlyData.days[0].hours;
	let hourlyDataLength = hourlyData.days.length;

	// filter non existent hours or with no forecast
	let filteredUpcomingHours = upcomingHours.filter(
		(element) => element.temp !== undefined
	);

	if (hourlyDataLength > 1) {
		// get the hours that overlap to the next day.
		let tomorrowHours = hourlyData.days[1].hours;

		// combine the hours in a single array
		let nextHours = filteredUpcomingHours.concat(tomorrowHours);

		return nextHours;
	}

	return filteredUpcomingHours;
};
