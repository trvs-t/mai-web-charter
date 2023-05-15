import { writable } from 'svelte/store';

export const playerConfig = writable({
	radius: 200,
	innerPadding: 40,
	noteSpeed: 400 // ms
});
