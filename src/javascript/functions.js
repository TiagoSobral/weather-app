import {
	CurrentWeather,
	DailyWeather,
	HourlyWeather,
	Location,
} from './classes';

const getWeatherFrom = async function getLocationWeather(location, unit) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=BJAE6JWBDH7WPY5BL3ZEC9MUC`,
		{ mode: 'cors' }
	);

	const data = await promise.json();

	return { data };
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
	let forecast = [];

	for (let day = 0; day < 7; day++) {
		let currentDay = dataForecast[day];

		let dayInfo = new DailyWeather(
			currentDay.datetime,
			currentDay.tempmax,
			currentDay.tempmin,
			currentDay.conditions
		);

		forecast.push(dayInfo);
	}

	return { forecast };
};

const getHourlyData = function getWeatherHourly(hourlyData) {
	let hours = hourlyData.map((hour) => {
		let currentHour = hour;

		let hourInfo = new HourlyWeather(
			currentHour.datetime,
			currentHour.conditions,
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
	const weatherData = (await getWeatherFrom(weatherLocation, unit)).data;
	const dailyData = (await weatherData).days;
	const currentDay = 0;
	const hourlyData = (await dailyData)[currentDay].hours;

	const current = getCurrentData(weatherData);
	const forecast = getForecastData(dailyData);
	const hourlyForecast = getHourlyData(hourlyData);

	const location = new Location(weatherData.address);

	const weather = Object.assign(location, current, hourlyForecast, forecast);

	console.log(weather);

	return weather;
};
