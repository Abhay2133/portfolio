import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  const configuredBase = env.VITE_BASE_PATH?.trim();
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'portfolio';
  const defaultBase = process.env.GITHUB_ACTIONS === 'true' ? `/${repositoryName}/` : '/';
  const base = configuredBase || defaultBase;

  const normalizedBase =
    base === '/'
      ? '/'
      : `/${base.replace(/^\/+|\/+$/g, '')}/`;

  return {
    base: normalizedBase,
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
