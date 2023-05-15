<script lang="ts">
	import type { TapVisualizeData } from '$lib/data/visualization';
	import { onMount } from 'svelte';
	import { Image } from 'svelte-konva';
	import { laneMovement } from './lane';

	export let data: TapVisualizeData = {
		lane: 1,
		hitTime: 400
	};

	let image: HTMLImageElement | undefined;
	onMount(() => {
		image = document.getElementById('tapSprite') as HTMLImageElement;
	});

	const size = 122;
	const spriteScale = 1 / 3;
	const width = size * spriteScale,
		height = size * spriteScale;

	const movement = laneMovement(data.hitTime);

	$: hide = !$movement.hasStarted || $movement.hasEnded;
</script>

{#if !hide}
	<Image
		config={{
			image,
			width,
			height,
			offsetX: width / 2,
			offsetY: height / 2,
			y: $movement.displacement
		}}
	/>
{/if}
