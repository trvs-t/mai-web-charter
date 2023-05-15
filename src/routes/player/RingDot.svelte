<script lang="ts">
	import Konva from 'konva';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-konva';
	import { playerConfig } from './config';

	let handle: Konva.Circle;

	let focusTween: Konva.Tween | undefined;
	onMount(() => {
		focusTween = new Konva.Tween({
			node: handle,
			duration: 0.15,
			radius: 10,
			easing: Konva.Easings.EaseInOut
		});
	});

	function handleMouseEnter() {
		const stage = handle.getStage();
		if (stage) stage.container().style.cursor = 'pointer';
		focusTween?.play();
	}
	function handleMouseLeave() {
		const stage = handle.getStage();
		if (stage) stage.container().style.cursor = 'default';
		focusTween?.reset();
	}
</script>

<Circle
	config={{
		x: 0,
		y: $playerConfig.radius,
		radius: 5,
		fill: 'white',
		hitFunc(con, shape) {
			con.beginPath();
			con.arc(0, 0, 10, 0, Math.PI * 2, false);
			con.closePath();
			con.fillStrokeShape(shape);
		}
	}}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	bind:handle
/>
