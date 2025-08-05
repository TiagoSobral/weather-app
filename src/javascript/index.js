import '../css/style.css';

const getWeatherFrom = async function getLocationWeather(location) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BJAE6JWBDH7WPY5BL3ZEC9MUC`,
		{ mode: 'cors' }
	);

	const data = await promise.json();

	console.log(data);

	return { data };
};

const getCurrentData = async function getLocationWeatherData(location) {
	const weatherInfo = await getWeatherFrom(location);

	let address = weatherInfo.data.resolvedAddress;
	let temperature = weatherInfo.data.currentConditions.temp;
	let condition = weatherInfo.data.currentConditions.conditions;
	let highTemp = weatherInfo.data.days[0].tempmax;
	let lowTemp = weatherInfo.data.days[0].tempmin;
	let forecast = weatherInfo.data.days;

	return { address, temperature, condition, highTemp, lowTemp, forecast };
};

const getForecastData = async function getWeatherForecast(location) {
	const forecastInfo = (await getCurrentData(location)).forecast;

	let forecast = [];

	for (let day = 0; day < 7; day++) {
		let currentDay = forecastInfo[day];

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
