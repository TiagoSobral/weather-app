import {
	CurrentWeather,
	DailyWeather,
	HourlyWeather,
	Location,
} from './classes';
import { retrieveCurrent, retrieveForecast, retrieveHourly } from './data';

const getWeatherFrom = async function getLocationWeather(location, unit) {
	const current = await retrieveCurrent(location, unit);
	const hourly = await retrieveHourly(location, unit);
	const forecast = await retrieveForecast(location, unit);

	return { current, hourly, forecast };
};

const getCurrentData = function getLocationWeatherData(data) {
	let weather = data;
	let currentDay = 0;

	let temperature = weather.currentConditions.temp;
	let condition = weather.currentConditions.conditions;
	let upcomingCondition = weather.description;

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
	debugger;
	let nextSevenDays = dataForecast.days;
	let forecast = [];

	for (let day = 0; day < 8; day++) {
		let currentDay = nextSevenDays[day];

		let dayInfo = new DailyWeather(
			currentDay.datetime,
			currentDay.conditions,
			currentDay.tempmin,
			currentDay.tempmax
		);

		forecast.push(dayInfo);
	}

	return { forecast };
};

const getHourlyData = function getWeatherHourly(hourlyData) {
	// hours come from json separated by days
	let upcomingHours = hourlyData.days[0].hours;
	let tomorrowHours = hourlyData.days[1].hours;

	// filter non existent hours or with no forecast
	let filteredUpcomingHours = upcomingHours.filter(
		(element) => element.temp !== undefined
	);

	// combine the hours in a single array
	let nextHours = filteredUpcomingHours.concat(tomorrowHours);

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

	const dailyData = weatherData.forecast;
	const currentData = weatherData.current;
	const hourlyData = weatherData.hourly;

	const currentWeather = getCurrentData(currentData);
	const forecastWeather = getForecastData(dailyData);
	const hourlyWeather = getHourlyData(hourlyData);

	const location = new Location(address);

	const weather = Object.assign(
		location,
		currentWeather,
		hourlyWeather,
		forecastWeather
	);

	console.log(weather);

	return weather;
};
