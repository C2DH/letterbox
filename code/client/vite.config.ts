import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  // print the loaded environment variables to verify
  console.log('env.VITE_PROXY_API_TARGET: ', env.VITE_PROXY_API_TARGET);
  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "src/**/*.{ts,tsx}" --cache ',
        },
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_PROXY_API_TARGET || 'http://localhost:3000',
          changeOrigin: true,
        },
        '/graphql': {
          target: env.VITE_PROXY_API_TARGET || 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT) || 5173,
      allowedHosts: true,
    },
  };
});
