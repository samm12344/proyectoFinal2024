import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite que el servidor escuche en todas las interfaces de red
    port: 5173, // Puerto de tu servidor de desarrollo
    proxy: {
      '/api': {
        target: 'https://api.clashroyale.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});
