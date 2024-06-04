import { defineConfig } from 'vite';
// @ts-ignore
import nested from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import tailwindcssConfig from './tailwind.config.js'; // 注意匹配实际文件
import postcssPresetEnv from 'postcss-preset-env';
import uni from '@dcloudio/vite-plugin-uni';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss({
          config: tailwindcssConfig,
        }),
        postcssPresetEnv({
          stage: 3,
          features: { 'nesting-rules': false },
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    uni(),
    uniTailwind({
      /* options */
    }),
  ],
});