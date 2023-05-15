export function radToDegree(rad: number) {
	return rad * (180 / Math.PI);
}

export function getMultiplesInInterval(interval: [number, number], multiple: number) {
	const [start, end] = interval;
	const first = Math.ceil(start / multiple) * multiple;
	const last = Math.floor(end / multiple) * multiple;
	const count = (last - first) / multiple + 1;
	const multiples = Array(count)
		.fill(0)
		.map((_, i) => first + i * multiple);
	return { first, last, count, multiples };
}
