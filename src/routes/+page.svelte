<script lang="ts">
  import logoUrl from '$lib/assets/logo.png';
  import { Aborted, Done, Intro, Ready, Recording } from '$lib/components/views';
  import { RecordingStep, useRecording } from '$lib/state';

  const recording = useRecording();
</script>

<div class="flex grow flex-col gap-6 p-8">
  <img src={logoUrl} alt="Alchymisti" class="mx-auto w-40" />

  {#if recording.currentStep === RecordingStep.Intro}
    <Intro />
  {:else if recording.currentStep === RecordingStep.Ready}
    <Ready />
  {:else if recording.currentStep === RecordingStep.Recording}
    <Recording />
  {:else if recording.currentStep === RecordingStep.Aborted}
    <Aborted />
  {:else}
    <Done />
  {/if}
</div>
