<script lang="ts">
  import { Button } from '$lib/components/button';
  import { useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<h1 class="text-center text-4xl font-bold">Hotovo!</h1>

<div class="mt-auto flex flex-col items-center gap-2">
  <Button variant={['border', 'bg']} onclick={() => recording.restart()}>Začít znovu</Button>
</div>
