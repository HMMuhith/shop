import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  
  assetsInclude: ['**/*.JPG',"**/*.PNG"],
  plugins: [react()
  ],
  // resolve:{
  //   extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  // },
  // base:'/'
})
