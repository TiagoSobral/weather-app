export const createListItem = function createListItem(
	classIdentifier,
	text,
	parent
) {
	const li = document.createElement('li');

	li.className = classIdentifier;
	li.textContent = text;

	parent.appendChild(li);
};

export const createUl = function createListGroup(classIdentifier, parent) {
	const ul = document.createElement('ul');

	ul.className = classIdentifier;

	parent.appendChild(ul);

	return ul;
};
