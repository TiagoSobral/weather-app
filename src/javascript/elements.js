export const elementsVisibility = function changeVisibility(bolean = 'false') {
	const main = document.querySelector('main');

	if (bolean === 'true') {
		return (main.style.visibility = 'visible');
	}

	main.style.visibility = 'hidden';
};

export const createListItem = function createListItem(
	classIdentifier,
	text,
	parent
) {
	const li = document.createElement('li');
	li.className = classIdentifier;

	if (!isNaN(text)) {
		// if its a number such as temperature it removes the decimal case
		li.textContent = `${Math.trunc(text)}°`;
	} else {
		li.textContent = text;
	}

	parent.appendChild(li);
};

export const createUl = function createListGroup(classIdentifier, parent) {
	const ul = document.createElement('ul');

	ul.className = classIdentifier;

	parent.appendChild(ul);

	return ul;
};

export const eraseElements = function eraseElementsForNewSearch() {
	const time = document.querySelectorAll('.time');

	if (time.length === 0) {
		return;
	}

	time.forEach((element) => element.remove());
};
