<script lang="ts">
	import { Arc, Group } from 'svelte-konva';
	import RingDot from '../RingDot.svelte';
	import { laneMovement } from '../notes/lane';

	export let time: number;
	export let isAccentBeat: boolean = false;
	const tween = laneMovement(time);
	const lanesArray = Array.from({ length: 8 }, (v, i) => i + 1);
</script>

<Arc
	config={{
		x: 0,
		y: 0,
		angle: 360,
		innerRadius: $tween.displacement - (isAccentBeat ? 1 : 0),
		outerRadius: $tween.displacement + (isAccentBeat ? 1 : 0),
		stroke: isAccentBeat ? 'white' : 'gray'
	}}
/>

{#each lanesArray as lane (lane)}
	<Group config={{ rotation: (360 / 8) * lane - 360 / 16 }}>
		<RingDot
			config={{
				y: $tween.displacement,
				fill: isAccentBeat ? 'white' : 'gray'
			}}
		/>
	</Group>
{/each}
