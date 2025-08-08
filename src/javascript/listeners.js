import { elementsVisibility, eraseElements } from './elements.js';
import { locationWeather } from './functions';
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

		return new Promise((resolve) => {
			let result = locationWeather(searchValue);

			resolve(result);
		})
			.then((result) => {
				let weatherLocation = result;

				displayCurrent(weatherLocation);

				return weatherLocation;
			})
			.then((result) => {
				displayHourly(result);
				displayDaily(result);

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
