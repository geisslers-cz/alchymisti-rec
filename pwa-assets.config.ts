import { defineConfig, minimal2023Preset, type Preset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: patchPreset(minimal2023Preset),
  images: ['static/logo.png'],
});

function patchPreset(preset: Preset): Preset {
  for (const asset of Object.values(preset)) {
    if (asset.sizes) {
      asset.padding = 0;
    }
  }

  return preset;
}
