<script>
	import { time, timerMeta } from './timer';

	function sync() {
		if (!$timerMeta.isPlaying) return;
		requestAnimationFrame((currentTime) => {
			$time = currentTime - $timerMeta.startTime;
			sync();
		});
	}

	$: if ($timerMeta.isPlaying) {
		sync();
	}
</script>
