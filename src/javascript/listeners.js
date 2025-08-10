import { elementsVisibility, eraseElements } from './elements.js';
import { locationWeather, searchWeather } from './functions';
import {
	clearValues,
	displayCurrent,
	displayDaily,
	displayHourly,
} from './UI.js';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');

export const formListener = function formSubmitListener() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		// making sure all the elements are clean before choosing another location
		clearValues();
		eraseElements();

		let searchValue = searchBox.value;

		if (!searchValue) {
			return alert('Invalid Input');
		}

		searchWeather(searchValue).then(() => {
			weatherBackground();
			elementsVisibility('true');

			searchBox.value = '';
		});
	});
};

const weatherBackground = function weatherListener() {
	const weather = document.querySelector('#current-condition').textContent;
	const body = document.querySelector('body');

	if (weather === 'Clear') {
		body.className = 'clear';
	}
};
