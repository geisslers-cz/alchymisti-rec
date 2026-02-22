<script lang="ts">
  import { Button } from '$lib/components/button';
  import { useRecording } from '$lib/state';
  import { formatTime } from '$lib/utils';

  const recording = useRecording();
  let [recSec, recMs] = $derived(formatTime(recording.recordingTime));
</script>

<h1 class="text-center text-4xl font-bold tabular-nums">
  Čas nahrávání:<br />
  {recSec}<small class="text-neutral-400">.{recMs}</small>
</h1>

<div class="my-auto flex justify-center">
  {#if recording.timeSinceIntro === undefined}
    <Button variant={['border', 'bg']} onclick={() => recording.playIntro()}>Spustit intro</Button>
  {:else}
    {@const [introSec] = formatTime(recording.timeSinceIntro)}
    <p class="text-center text-2xl">Čas od konce intra:<br />{introSec}</p>
  {/if}
</div>

<div class="mt-auto flex flex-col items-center gap-2">
  <Button variant={['border', 'bg', 'danger']} onclick={() => recording.abort()}>Přerušit</Button>
  <Button variant={['border', 'bg', 'success']} onclick={() => recording.done()}>Hotovo</Button>
</div>
