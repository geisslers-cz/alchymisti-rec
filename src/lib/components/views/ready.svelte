<script lang="ts">
  import { Button } from '$lib/components/button';
  import { useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<h1 class="text-center text-4xl font-bold">Spouštíme nahrávání!</h1>

<p class="my-auto text-center text-2xl">
  Podívejte se všichni přímo do kamery svého telefonu, zapněte nahrávání a řekněte "Jedu".
</p>

<div class="flex flex-col items-center gap-2">
  <Button variant="danger" onclick={() => recording.startRecording()}>Spustit nahrávání</Button>
</div>
