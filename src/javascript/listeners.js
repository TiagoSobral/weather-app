import { locationWeather } from './functions';
import { displayCurrent } from './ui';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');

export const formListener = function formSubmitListener() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		let searchValue = searchBox.value;

		if (!searchValue) {
			return alert('Invalid Input');
		}

		return new Promise((resolve) => {
			let result = locationWeather(searchValue);

			resolve(result);
		}).then((result) => {
			let weatherLocation = result.location;
			return displayCurrent(weatherLocation);
		});
	});
};
