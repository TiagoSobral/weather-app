import { locationWeather } from './functions';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');

export const formListener = function formSubmitListener() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		let searchValue = searchBox.value;

		if (!searchValue) {
			return alert('Invalid Input');
		}

		locationWeather(searchValue);
	});
};
