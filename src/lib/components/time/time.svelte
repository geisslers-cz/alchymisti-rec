<script module lang="ts">
  type Props = {
    time: number;
    fractional?: boolean;
  };
</script>

<script lang="ts">
  import { formatTime } from '$lib/utils';

  let { time, fractional }: Props = $props();
  let ts = $derived(fractional ? Math.round(time * 1000) : Math.trunc(time) * 1000);
  let [s, ms] = $derived(formatTime(ts));
</script>

<span class="tabular-nums">
  {#if fractional}
    {s}<small class="text-neutral-400">.{ms}</small>
  {:else}
    {s}
  {/if}
</span>
