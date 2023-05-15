<script lang="ts">
	import type { TapVisualizeData } from '$lib/data/visualization';
	import { calcTimeProgress } from '$lib/utils/time';
	import { onMount } from 'svelte';
	import { Image } from 'svelte-konva';
	import { playerConfig } from '../config';
	import { time } from '../time/timer';

	export let data: TapVisualizeData | undefined = undefined;

	let image: HTMLImageElement | undefined;
	onMount(() => {
		image = document.getElementById('tapSprite') as HTMLImageElement;
	});

	const size = 122;
	const spriteScale = 1 / 3;
	const width = size * spriteScale,
		height = size * spriteScale;

	let displacement = 0;

	$: if (data) {
		const { progress } = calcTimeProgress($time, data.hitTime, 400);
		displacement = progress * ($playerConfig.radius - $playerConfig.innerPadding);
	}
</script>

<Image
	config={{
		image,
		width,
		height,
		offsetX: width / 2,
		offsetY: height / 2 - $playerConfig.innerPadding,
		y: displacement
	}}
/>
