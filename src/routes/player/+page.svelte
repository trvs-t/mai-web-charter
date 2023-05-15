<script lang="ts">
	import { Arc, Group, Layer, Stage } from 'svelte-konva';
	import RingDot from './RingDot.svelte';
	import BarLines from './bar-lines/BarLines.svelte';
	import { playerConfig } from './config';
	import Hold from './notes/Hold.svelte';
	import Slide from './notes/slide/Slide.svelte';
	import SpriteLoader from './notes/sprite/SpriteLoader.svelte';
	import Tap from './notes/tap.svelte';
	import Controls from './time/Controls.svelte';
	import TimerSync from './time/TimerSync.svelte';

	const radius = 200;
	const lanesArray = Array.from({ length: 8 }, (v, i) => i + 1);
</script>

<SpriteLoader />
<TimerSync />
<Stage
	config={{
		width: $playerConfig.radius * 2 + 100,
		height: $playerConfig.radius * 2 + 100,
		offsetX: -$playerConfig.radius - 50,
		offsetY: -$playerConfig.radius - 50
	}}
>
	<!-- bg layer -->
	<Layer>
		<Arc
			config={{
				x: 0,
				y: 0,
				innerRadius: radius,
				outerRadius: radius,
				angle: 360,
				stroke: 'white'
			}}
		/>
		{#each lanesArray as lane (lane)}
			<Group config={{ rotation: (360 / 8) * lane - 360 / 16 }}>
				<RingDot />
			</Group>
		{/each}
		<BarLines bpm={160} divisionPerBar={4} />
	</Layer>

	<Layer>
		<Slide
			data={{
				lane: 1,
				hitTime: 0,
				startTime: 400,
				duration: 1000,
				slideType: 'Straight',
				direction: 'ccw',
				destinationLane: 5
			}}
		/>
		{#each lanesArray as lane (lane)}
			<Group config={{ rotation: (360 / 8) * lane - 360 / 16 }}>
				<Tap data={{ lane, hitTime: 500 }} />
				<Hold />
			</Group>
		{/each}
	</Layer>
</Stage>

<Controls />
