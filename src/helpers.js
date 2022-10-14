/*
 * This software or document includes material copied from or derived from Modal Dialog Example (https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog.html). Copyright © 2015 W3C® (MIT, ERCIM, Keio, Beihang).
 */

/**
 * @description Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns {boolean}
 *  true if element is focused.
 */
function attemptFocus(element) {
	if (!isFocusable(element)) {
		return false;
	}
	element.focus();
	return document.activeElement === element;
} // end attemptFocus

function isFocusable(element) {
	if (element.tabIndex < 0) {
		return false;
	}

	if (element.disabled) {
		return false;
	}

	switch (element.nodeName) {
		case "A":
			return !!element.href && element.rel !== "ignore";
		case "INPUT":
			return element.type !== "hidden";
		case "BUTTON":
		case "SELECT":
		case "TEXTAREA":
			return true;
		default:
			return false;
	}
}

export function filterClassNames(...classNames) {
	return classNames.filter((curr) => curr).join(" ");
}

export function chunk(arr, chunkSize = 1, cache = []) {
	let tmp = [...arr];
	if (chunkSize <= 0) return cache;
	while (tmp.length) cache.push(tmp.splice(0, chunkSize));
	return cache;
}

/**
 * @description Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns {boolean}
 *  true if a focusable element is found and focus is set.
 */
export function focusFirstDescendant(element) {
	for (let i = 0; i < element.childNodes.length; i++) {
		let child = element.childNodes[i];
		if (attemptFocus(child) || focusFirstDescendant(child)) {
			return true;
		}
	}
	return false;
} // end focusFirstDescendant
