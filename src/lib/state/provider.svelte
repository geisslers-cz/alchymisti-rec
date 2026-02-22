<script module lang="ts">
  import { createContext } from 'svelte';
  import { RecordingState } from './recording.svelte';

  const [useRecording, createRecordingContext] = createContext<RecordingState>();

  export { useRecording };
</script>

<script lang="ts">
  let { children } = $props();

  createRecordingContext(new RecordingState());
</script>

{@render children?.()}
