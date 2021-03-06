import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'
import ViteCompression from 'vite-plugin-compression'
import visualizer from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: '/',
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      // 开启压缩
      ViteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      visualizer(),
      styleImport({
        libs: [
          {
            libraryName: '@fect-ui/vue',
            esModule: true,
            resolveStyle: (name) => `@fect-ui/vue/es/${name}/index.css`,
          },
        ],
      }),
    ],
    resolve: {
      alias: [{ find: '@web', replacement: resolve(__dirname, 'src') }],
    },
    // less
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    build: {
      terserOptions: {
        // 移除console.log
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          // 去除注释
          comments: true,
        },
      },
      assetsDir: 'static/img/',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    // config proxy
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4001',
          changeOrigin: true,
          // /api/todo -> http://localhost:4000/todo
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
