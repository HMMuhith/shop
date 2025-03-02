import React ,{useEffect} from "react";
import Route from "./routes";
// import TimeOut from "./timeout";



function App() {
  
  return (
    <>
    <div className="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 lg:w-full w-full overflow-hidden lg:overflow-hidden lg:relative relative h-auto lg:h-auto ">
        <Route />
      </div>
    </>
  );

}

export default App;
 