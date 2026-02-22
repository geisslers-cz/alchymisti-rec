<script lang="ts">
  import { Button } from '$lib/components/button';
  import { useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<h1 class="my-auto text-center text-4xl font-bold">Hotovo!</h1>

<div class="flex flex-col items-center gap-2">
  <Button onclick={() => recording.restart()}>Začít znovu</Button>
</div>
