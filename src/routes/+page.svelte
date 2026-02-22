<script lang="ts">
  import logoUrl from '$lib/assets/logo.png';
  import { Done, Intro, Ready, Recording } from '$lib/components/views';
  import { RecordingStep, useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<div class="flex grow flex-col gap-8 px-8 py-12">
  <img src={logoUrl} alt="Alchymisti" class="mx-auto w-40" />

  {#if recording.currentStep === RecordingStep.Intro}
    <Intro />
  {:else if recording.currentStep === RecordingStep.Ready}
    <Ready />
  {:else if recording.currentStep === RecordingStep.Recording}
    <Recording />
  {:else}
    <Done />
  {/if}
</div>
