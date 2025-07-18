/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    darkMode:'class',
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
      },
      notify:{
'0%':{transform:'translateX(0%)'},
'100%':{transform:'translateX(20%)'}
      }
    },
      animation:{
      cherry:'cherry 5s linear  infinite',
      spin_load:'spin 1s linear infinite',
      notify:'notify 2s linear .5s forwards'
    }
    ,
    screens:{
      'sm':'100px',
      'md':'800px',
      'lg':'1024px',
      'xl':'1280px',
      '2xl':'1536px'},
      colors:{
        'blur':'rgba(0,0,0,0.5);',
        'position':'#314158;',
        'round':'#d4d4d4;'
      }
    },
  },
  plugins: [],
}

