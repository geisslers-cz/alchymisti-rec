<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Time } from '$lib/components/time';
  import { useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<h1 class="text-center text-4xl font-bold tabular-nums">
  Čas nahrávání:<br />
  <Time fractional time={recording.recordingTime} />
</h1>

<div class="my-auto flex flex-col items-center gap-4">
  {#if recording.introStartTime === undefined}
    <Button onclick={() => recording.playIntro()}>Spustit intro</Button>
  {:else}
    <p class="text-center text-2xl">
      Začátek intra:<br />
      <Time time={recording.introStartTime} />
    </p>
    <p class="text-center text-2xl">
      Čas od konce intra:<br />
      <Time time={recording.timeSinceIntroEnd} />
    </p>
  {/if}
</div>

<div class="mt-auto flex flex-col items-center gap-2">
  <Button variant="success" onclick={() => recording.done()}>Ukončit</Button>
</div>
