import { createListItem, createUl } from './elements';
import { format } from 'date-fns';

const currentInfoElem = document.querySelectorAll(
	'#current-location, #current-temperature, #current-condition, .current-high, .current-low, .upcoming-conditions'
);

export const displayCurrent = function displayCurrentWeather(weatherObject) {
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

		if (!isNaN(currentElementOfArray)) {
			currentDomElement.textContent = `${Math.trunc(currentElementOfArray)}°C`;
			continue;
		}
		currentDomElement.textContent = currentElementOfArray;
	}
};

export const displayHourly = function displayHourlyWeather(weatherObject) {
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
	let weatherByDay = weatherObject.forecast;
	const elementByDay = document.querySelector('.forecast-daily-weather');

	weatherByDay.forEach((element) => {
		const elementValues = Object.values(element);
		const elementKeys = Object.keys(element);
		const ul = createUl('time', elementByDay);

		for (let index = 0; index < elementKeys.length; index++) {
			let currentKey = elementKeys[index];
			let currentValue = elementValues[index];

			createListItem(currentKey, currentValue, ul);
		}
	});

	changeDates();
	changeTime();
	conditionsAsClass();
};

const changeDates = function changeDatesToDays() {
	const dates = document.querySelectorAll('.date');

	dates.forEach((date) => {
		let newDate = format(date.textContent, 'EEE');

		date.textContent = newDate;
	});
};

const changeTime = function alterTimeFormat() {
	const hoursElem = document.querySelectorAll('.hours');

	hoursElem.forEach((element) => {
		let result = element.textContent.slice(0, 5);
		element.textContent = result;
	});
};

export const clearValues = function clearContent() {
	currentInfoElem.forEach((element) => (element.textContent = ''));
};

const conditionsAsClass = function setContentAsClassName() {
	const conditionsElem = document.querySelectorAll('.conditions');

	conditionsElem.forEach((condition) => {
		let value = condition.textContent.toLocaleLowerCase();

		condition.setAttribute('data-conditions', `${value}`);

		condition.textContent = '';
	});
};

export const convertUnits = function unitConversion(boolean) {
	const temperatures = document.querySelectorAll(
		'#current-temperature, .current-high, .current-low, .temperature, .low , .high'
	);

	temperatures.forEach((element) => {
		const elemValue = element.textContent;

		const temperature = elemValue.slice(0, 2);

		if (boolean) {
			const fahrenheit = Math.trunc(Number(temperature) * 1.8 + 32);
			element.textContent = `${fahrenheit}°F`;
		} else {
			const celsius = Math.trunc((Number(temperature) - 32) / 1.8);
			element.textContent = `${celsius}°C`;
		}
	});
};
