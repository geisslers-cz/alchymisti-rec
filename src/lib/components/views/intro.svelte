<script lang="ts">
  import { Button } from '$lib/components/button';
  import { useRecording } from '$lib/state';

  const recording = useRecording();
  let initialising = $state(false);

  async function onclick(): Promise<void> {
    initialising = true;
    await recording.begin();
  }
</script>

<h1 class="text-center text-4xl font-bold">Připrav se...</h1>

<p class="my-auto text-center text-2xl">
  Na mobilech si všichni otevřete aplikaci fotoaparátu a připravte ji pro nahrávání videa.
  Nezapomeňte zkontrolovat, že nemáte vypnutý mikrofon.
</p>

<div class="flex flex-col items-center gap-2">
  <Button variant={['border', 'bg']} {onclick} disabled={initialising}>
    {initialising ? 'Inicializuji...' : 'Pokračovat'}
  </Button>
</div>
