import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // 🔹 Указываем base для GitHub Pages
    base: '/project-2.WebTech/',

    // 🔹 Корень проекта
    root: 'src',

    // 🔹 Настройки сборки
    build: {
      sourcemap: true,
      outDir: '../dist', // dist будет на уровень выше src
      emptyOutDir: true,
      rollupOptions: {
        // 🔹 Все HTML файлы из src
        input: glob.sync('./src/*.html'),

        output: {
          // 🔹 JS из node_modules в отдельный файл vendor
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },

          // 🔹 Настройка имен файлов
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },

          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    // 🔹 Плагины
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
