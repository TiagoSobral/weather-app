import { locationWeather } from './functions';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');
const addLocation = document.querySelector('button');

export const buttonListener = function addLocationListener() {
	addLocation.addEventListener('click', () => {
		let searchValue = searchBox.value;

		locationWeather(searchValue);
	});
};

export const searchListener = function searchBoxListener() {
	form.addEventListener('submit', (event) => {
		debugger;
		let searchValue = searchBox.value;

		if (!searchValue) {
			return event.preventDefault();
		}

		locationWeather(searchValue);
	});
};
