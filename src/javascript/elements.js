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
	} else if (text.includes(':')) {
		// because time is in a string format if it includes ':' then remove the seconds.

		li.textContent = text.slice(0, 5);
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
