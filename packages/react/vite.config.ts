import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { peerDependencies } from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
    },
  },
});
