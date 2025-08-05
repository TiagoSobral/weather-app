import { CurrentWeather, Location } from './classes';

const getWeatherFrom = async function getLocationWeather(location, unit) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=BJAE6JWBDH7WPY5BL3ZEC9MUC`,
		{ mode: 'cors' }
	);

	const data = await promise.json();

	console.log(data);

	return { data };
};

const getCurrentData = function getLocationWeatherData(data) {
	let address = data.resolvedAddress;
	let temperature = data.currentConditions.temp;
	let condition = data.currentConditions.conditions;
	let highTemp = data.days[0].tempmax;
	let lowTemp = data.days[0].tempmin;

	return { address, temperature, condition, highTemp, lowTemp };
};

const getForecastData = function getWeatherForecast(dataForecast) {
	let forecast = [];

	for (let day = 0; day < 7; day++) {
		let currentDay = dataForecast[day];

		let dayInfo = {
			date: currentDay.datetime,
			highTemp: currentDay.tempmax,
			lowTemp: currentDay.tempmin,
			condition: currentDay.conditions,
		};

		forecast.push(dayInfo);
	}

	return { forecast };
};

export const locationWeather = async function groupedData(
	weatherLocation,
	unit = 'metric'
) {
	const weatherData = (await getWeatherFrom(weatherLocation, unit)).data;
	const forecastData = (await weatherData).days;

	const weatherInfo = getCurrentData(weatherData);
	const forecastInfo = getForecastData(forecastData);

	const weather = new CurrentWeather(
		weatherInfo.temperature,
		weatherInfo.condition,
		weatherInfo.highTemp,
		weatherInfo.lowTemp
	);

	const location = new Location(weatherInfo.address, weather, forecastInfo);

	console.log(location);
};
