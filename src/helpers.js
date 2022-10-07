export function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function filterClassNames(classNames) {
	return classNames.filter((curr) => curr).join(" ");
}

export function chunk(arr, chunkSize = 1, cache = []) {
	let tmp = [...arr];
	if (chunkSize <= 0) return cache;
	while (tmp.length) cache.push(tmp.splice(0, chunkSize));
	return cache;
}
