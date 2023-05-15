<script lang="ts">
	import type { SlideVisualizationData } from '$lib/data/visualization';
	import { getLaneRotationDegree } from '$lib/utils/lane';
	import { splitPath, type AngledPoint } from '$lib/utils/svg';
	import { onMount } from 'svelte';
	import { Group, Image } from 'svelte-konva';
	import { getTimerProgress, time } from '../../time/timer';
	import { getSlidePath } from './pathId';

	const slideWidth = 70 / 3,
		slideHeight = 94 / 3;

	const slideAppearTime = 400; // todo: config

	export let data: SlideVisualizationData;
	const { lane, hitTime, startTime, duration, slideType, direction, destinationLane } = data;

	let image: HTMLImageElement | undefined;
	onMount(() => {
		image = document.getElementById('slideSprite') as HTMLImageElement;
	});

	const rotation = getLaneRotationDegree(lane);
	const radius = 200;
	const scale = radius / (1080 / 2);

	const { slidePath: path, mirror } = getSlidePath({
		slideType,
		destinationDifference: destinationLane - lane,
		direction
	});
	let points: AngledPoint[] = path ? splitPath(path, slideHeight * 1.5) : [];

	const slideTween = getTimerProgress(startTime, duration);
	$: ({ progress, hasEnded } = $slideTween);

	const appearTween = getTimerProgress(hitTime - slideAppearTime, slideAppearTime);

	$: hide = hasEnded || $time < hitTime - slideAppearTime || !path;
	$: firstVisiblePointIndex = progress < 0 ? 0 : Math.ceil(progress * points.length);
	$: pointsToDraw = points.slice(firstVisiblePointIndex);
</script>

{#if !hide}
	<Group
		config={{
			rotation: rotation + (360 * 7) / 16,
			scaleX: mirror ? -1 : 1,
			opacity: $appearTween.progress
		}}
	>
		{#each pointsToDraw as point, i (`point${i}`)}
			<Image
				config={{
					image,
					width: slideWidth,
					height: slideHeight,
					offset: { x: slideWidth / 2, y: slideHeight / 2 },
					x: point.point[0] * scale - radius,
					y: point.point[1] * scale - radius,
					rotation: point.angle - 90
				}}
			/>
		{/each}
	</Group>
{/if}
