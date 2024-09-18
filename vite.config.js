import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';  // Add this import

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),  // Update this line
    },
  },
  build: {
    rollupOptions: {
      external: ['formik'],
    },
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'dayjs'],
  },
});
