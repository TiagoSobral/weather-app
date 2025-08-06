const currentInfoElem = document.querySelectorAll(
	'.current-weather :not(ul), .upcoming-conditions'
);
// const currHighLowTempElem = document.querySelectorAll('#current-max-min');

export const displayCurrent = function displayCurrentWeather(weatherObject) {
	debugger;
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
