import { calcTimeProgress } from '$lib/utils/time';
import { derived } from 'svelte/store';
import { playerConfig } from '../config';
import { time } from '../time/timer';

export const laneMovement = (hitTime: number) =>
	derived([time, playerConfig], ([$time, $playerConfig]) => {
		const { progress, ...tween } = calcTimeProgress(
			$time,
			hitTime - $playerConfig.noteSpeed,
			$playerConfig.noteSpeed
		);
		const travelDistance = $playerConfig.radius - $playerConfig.innerPadding;
		const displacement = progress * travelDistance + $playerConfig.innerPadding;
		return {
			displacement,
			...tween
		};
	});
