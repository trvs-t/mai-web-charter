<script lang="ts">
	import { getMultiplesInInterval } from '$lib/utils/math';
	import { playerConfig } from '../config';
	import { time } from '../time/timer';
	import BarLine from './BarLine.svelte';

	// todo context
	export let bpm: number;
	export let divisionPerBar: number;

	const msPerDivision = (60000 / bpm / divisionPerBar) * 4;
	$: visibleTimes = [$time, $time + $playerConfig.noteSpeed] as [number, number];
	$: ({ multiples } = getMultiplesInInterval(visibleTimes, msPerDivision));
</script>

{#each multiples as multiple (multiple)}
	<BarLine time={multiple} isAccentBeat={(multiple / msPerDivision) % divisionPerBar === 0} />
{/each}
