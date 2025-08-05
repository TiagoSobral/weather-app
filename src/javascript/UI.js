const currentInfoElem = document.querySelectorAll('.current-weather :not(ul)');
// const currHighLowTempElem = document.querySelectorAll('#current-max-min');

export const displayCurrent = function displayCurrentWeather(weatherObject) {
	let currentWeatherInfo = weatherObject.current;
	let currentWeatherLocation = weatherObject.location;
	let arrayOfCurrentInfo = [
		currentWeatherLocation,
		currentWeatherInfo.temperature,
		currentWeatherInfo.condition,
		currentWeatherInfo.high,
		currentWeatherInfo.low,
	];

	for (let index = 0; index < arrayOfCurrentInfo.length; index++) {
		let currentElementOfArray = arrayOfCurrentInfo[index];
		let currentDomElement = currentInfoElem[index];

		currentDomElement.textContent = currentElementOfArray;
	}
};
