import { locationWeather } from './functions';
import { displayCurrent, displayHourly } from './UI.js';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');

export const formListener = function formSubmitListener() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		// debugger;
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
			});
	});
};
