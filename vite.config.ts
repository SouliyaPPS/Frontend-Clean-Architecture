import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import vitePluginImp from 'vite-plugin-imp'
import reactRefresh from '@vitejs/plugin-react-refresh'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh({
      // Exclude storybook stories and node_modules
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      // Only .tsx files
      include: '**/*.tsx',
    }),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  base: './',
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
