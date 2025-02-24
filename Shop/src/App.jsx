import React ,{useEffect} from "react";
import Route from "./routes";
import TimeOut from "./timeout";



function App() {
  useEffect(()=>{
    const elem=document.getElementById('timeout')
    setTimeout(()=>{
      elem?.remove()
    },9000)
    },[])
  return (
    <>
    <div className="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 lg:w-full w-full overflow-hidden lg:overflow-hidden lg:relative relative h-auto lg:h-auto ">
        <Route />
      </div>
      <div id="timeout" className="fixed top-0"><TimeOut/></div>
    </>
  );

}

export default App;
 