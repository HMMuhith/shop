/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        poppins:["Poppins"],
        IBM:["IBM Plex Sans"],
        PT:["PT Sans"]
      },
      keyframes:{
      cherry:{
        '0%':{transform :'translate(0,0)'},
        '100%':{transform:'translate(800px,0)'},
        // '50%':{transform:'translateX(100px)'},
        // '50%':{transform:'translateX(-1200px)'},
        // '75%':{transform:'translateX(1200px)'}
      }
    },
      animation:{
      cherry:'cherry 5s linear  infinite',
      spin_load:'spin 1s linear infinite'
    }
    ,
    screens:{
      'sm':'100px',
      'md':'800px',
      'lg':'1024px',
      'xl':'1280px',
      '2xl':'1536px'},
    },
  },
  plugins: [],
}

