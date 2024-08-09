import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': resolve(__dirname, 'src') // 兼容src目录下的文件夹可通过 @/components/HelloWorld.vue写法
    }
  },
  css:{
    preprocessorOptions: {
      scss: {
         additionalData: ['@import "./src/style/base.scss";'], // 全局公共样式
         charset:false
      }
   }
  }
})
