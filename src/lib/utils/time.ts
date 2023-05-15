export const calcTimeProgress = (time: number, startTime: number, duration: number) => {
	const hasStarted = time > startTime;
	const hasEnded = time > startTime + duration;
	if (hasEnded) return { progress: 1, hasStarted, hasEnded };
	if (!hasStarted) return { progress: 0, hasStarted, hasEnded };
	const progress = (time - startTime) / duration;
	return { progress, hasStarted, hasEnded };
};
