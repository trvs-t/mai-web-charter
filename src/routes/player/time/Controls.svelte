<script>
	import { time, timerMeta } from './timer';

	function play() {
		$timerMeta.startTime = performance.now();
		$timerMeta.isPlaying = true;
	}
	function pause() {
		$timerMeta.isPlaying = false;
	}
	function stop() {
		$timerMeta.isPlaying = false;
		requestAnimationFrame(() => {
			$time = 0;
		});
	}
</script>

{#if !$timerMeta.isPlaying}
	<button type="button" class="btn text-white variant-filled" on:click={play}>Play</button>
{:else}
	<button type="button" class="btn text-white variant-filled" on:click={pause}>Pause</button>
{/if}
<button type="button" class="btn text-white variant-filled" on:click={stop}>Stop</button>
