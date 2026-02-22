<script lang="ts">
  import { registerSW } from 'virtual:pwa-register';

  registerSW({
    immediate: true,
    onRegisteredSW: tryUpdate,
  });

  async function tryUpdate(url: string, registration?: ServiceWorkerRegistration): Promise<void> {
    setTimeout(() => tryUpdate(url, registration), 30000);

    if ('onLine' in navigator && !navigator.onLine) {
      return;
    }

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          cache: 'no-store',
          'cache-control': 'no-cache',
        },
      });

      if (response.status === 200) {
        await registration?.update();
        location.reload();
      }
    } catch {
      // noop
    }
  }
</script>
