import { calcTimeProgress } from '$lib/utils/time';
import { derived, writable } from 'svelte/store';

export const time = writable(0);

export const timerMeta = writable({
	isPlaying: false,
	isAudioSync: false,
	startTime: 0
});

export function getTimerProgress(startTime: number, duration: number) {
	return derived(time, ($time) => calcTimeProgress($time, startTime, duration));
}
