<script lang="ts">
	import type { HoldVisualizeData } from '$lib/data/visualization';
	import { onMount } from 'svelte';
	import { Group, Image } from 'svelte-konva';
	import { laneMovement } from './lane';

	export let data: HoldVisualizeData = {
		hitTime: 400,
		lane: 1,
		duration: 400
	};
	const { hitTime, duration } = data;

	let image: HTMLImageElement | undefined;
	onMount(() => {
		image = document.getElementById('holdSprite') as HTMLImageElement;
	});

	const width = 122;
	const height = 200;
	const headSize = 72;
	const bodySpriteSize = height - headSize * 2;
	const spriteScale = 1 / 3;

	const headMovement = laneMovement(hitTime);
	$: start = $headMovement.displacement;
	const tailMovement = laneMovement(hitTime + duration);
	$: end = $tailMovement.displacement;

	$: bodySize = Math.abs(end - start);
	$: hide = !$headMovement.hasStarted || $tailMovement.hasEnded;
</script>

{#if !hide}
	<Group
		config={{
			offsetX: (width * spriteScale) / 2,
			offsetY: (height * spriteScale) / 2
		}}
	>
		<!-- Head -->
		<Image
			config={{
				image,
				width,
				height: headSize,
				scaleX: spriteScale,
				scaleY: spriteScale,
				cropWidth: width,
				cropY: height - headSize, // actually bottom part of the sprite
				cropHeight: headSize,
				y: start,
				offsetY: -height / 2 // anchor head end to 0
			}}
		/>
		<!-- Body -->
		<Image
			config={{
				image,
				width,
				height: bodySize, // ignore Y scaling, fit directly into height
				scaleX: spriteScale,
				cropWidth: width,
				cropY: headSize,
				cropHeight: bodySpriteSize,
				y: end,
				offsetY: (-height / 2) * spriteScale // has to scale the offset tho
			}}
		/>
		<!-- Tail -->
		<Image
			config={{
				image,
				width,
				height: headSize,
				scaleX: spriteScale,
				scaleY: spriteScale,
				cropWidth: width,
				cropHeight: headSize,
				y: end,
				offsetY: -(height / 2 - headSize) // anchor tail start to 0
			}}
		/>
	</Group>
{/if}
