import { getGeolocation } from './data.js';
import { elementsVisibility, eraseElements } from './elements.js';
import { searchWeather } from './functions';
import { clearValues } from './UI.js';

const form = document.querySelector('form');
const searchBox = document.querySelector('input');
const body = document.querySelector('body');

export const pageLoadListener = function listenToGeolocation() {
	window.addEventListener('load', async () => {
		// gets geolocation if user allows it, it will give exact coordinates
		const location = await getGeolocation();

		// uses searchWeather the same way search input uses.
		await searchWeather(location);

		// uses await and then calls all the styling functions and shows visibility
		weatherBackground();
		currentWeatherBG();
		elementsVisibility('true');
	});
};

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
			currentWeatherBG();
			elementsVisibility('true');

			searchBox.value = '';
		});
	});
};

const weatherBackground = async function weatherListener() {
	const weather = document.querySelector('.time:first-of-type > .conditions');
	let value = weather.dataset.conditions;

	const { default: img } = await import(`../images/${value}.jpg`);

	body.style.backgroundImage = `url(${img})`;
};

const currentWeatherBG = async function currentWeatherBackground() {
	// debugger;
	const weather = document.querySelector('.time:first-of-type > .conditions');

	const currentCondition = document.querySelector('.current-icon');

	let value = weather.dataset.conditions;

	switch (value) {
		case 'clear-night':
			value = 'night';
			break;

		case 'clear-day':
			value = 'sun';
			break;

		case 'partly-cloudy-day':
			value = 'partially-cloudy';
			break;

		case 'rain':
			value = 'rainning';
			break;

		case 'partly-cloudy-night':
			value = 'night';
			break;
	}

	const { default: img } = await import(`../svgs/${value}.svg`);

	currentCondition.src = `${img}`;
};
