import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'


export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
      },
      build: {
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/main.jsx'),
          name: 'react-wp',
          // the proper extensions will be added
          fileName: 'react-wp',
        },
      },
      define: {
        'process.env': {}
      },
      plugins: [react()],
      server: {
        port: 5173
      },
    }
  }
  if (mode === 'production') {
    return {
      resolve: {
        alias: [
          { find: '@', replacement: path.resolve(__dirname, 'src') }
        ]
      },
      build: {
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/main.jsx'),
          name: 'react-wp',
          // the proper extensions will be added
          fileName: 'react-wp',
        },
      },
      define: {
        'process.env': {}
      },
      plugins: [react()],
      server: {
        port: 5173
      },
    }
  }
})