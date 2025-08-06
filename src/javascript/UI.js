import { createListItem, createUl } from './elements';

const currentInfoElem = document.querySelectorAll(
	'.current-weather :not(ul), .upcoming-conditions'
);
// const currHighLowTempElem = document.querySelectorAll('#current-max-min');

export const displayCurrent = function displayCurrentWeather(weatherObject) {
	// debugger;
	let current = weatherObject.current;
	let location = weatherObject.location;
	let arrayOfCurrentInfo = [
		location,
		current.temperature,
		current.currentCondition,
		current.high,
		current.low,
		current.upcomingCondition,
	];

	for (let index = 0; index < arrayOfCurrentInfo.length; index++) {
		let currentElementOfArray = arrayOfCurrentInfo[index];
		let currentDomElement = currentInfoElem[index];

		currentDomElement.textContent = currentElementOfArray;
	}
};

export const displayHourly = function displayHourlyWeather(weatherObject) {
	// debugger;
	let weatherByHour = weatherObject.hours;
	const elementByHour = document.querySelector('.weather-by-hour');

	weatherByHour.forEach((element) => {
		const elementValues = Object.values(element);
		const elementKeys = Object.keys(element);
		const ul = createUl('time', elementByHour);

		for (let index = 0; index < elementKeys.length; index++) {
			let currentKey = elementKeys[index];
			let currentValue = elementValues[index];

			createListItem(currentKey, currentValue, ul);
		}
	});
};
