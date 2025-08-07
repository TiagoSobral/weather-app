import { createListItem, createUl } from './elements';
import { format } from 'date-fns';

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

export const displayDaily = function displayDailyWeather(weatherObject) {
	debugger;
	let weatherByDay = weatherObject.forecast;
	const elementByDay = document.querySelector('.forecast-daily-weather');

	weatherByDay.forEach((element) => {
		const elementValues = Object.values(element);
		const elementKeys = Object.keys(element);
		const ul = createUl('time', elementByDay);

		for (let index = 0; index < elementKeys.length; index++) {
			// debugger;
			let currentKey = elementKeys[index];
			let currentValue = elementValues[index];

			createListItem(currentKey, currentValue, ul);
		}
	});

	changeDates();
};

const changeDates = function changeDatesToDays() {
	const dates = document.querySelectorAll('.date');

	dates.forEach((date) => {
		let newDate = format(date.textContent, 'EEE');

		date.textContent = newDate;
	});
};
