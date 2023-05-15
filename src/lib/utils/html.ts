export function createOrFindElement<T extends HTMLElement>(id: string, tag: string) {
	let element = document.getElementById(id);
	if (!element) {
		element = document.createElement(tag);
		element.id = id;
		document.body.appendChild(element);
	}
	return element as T;
}
