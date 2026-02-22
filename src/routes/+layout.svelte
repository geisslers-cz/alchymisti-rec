<script lang="ts">
  import '../app.css';
  import { pwaAssetsHead } from 'virtual:pwa-assets/head';
  import { pwaInfo } from 'virtual:pwa-info';
  import { PwaRegister } from '$lib/components/pwa';
  import { RecordingProvider } from '$lib/state';

  let { children } = $props();

  let manifest = $derived(pwaInfo?.webManifest);
</script>

<svelte:head>
  {#if pwaAssetsHead.themeColor}
    <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
  {/if}
  {#each pwaAssetsHead.links as link (link)}
    <link {...link} />
  {/each}
  {#if manifest}
    <link
      rel="manifest"
      href={manifest.href}
      crossorigin={manifest.useCredentials ? 'use-credentials' : null}
    />
  {/if}
</svelte:head>

<RecordingProvider>
  {@render children?.()}
</RecordingProvider>

<PwaRegister />
