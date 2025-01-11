import { createContext, useState } from "react";

const Theme=createContext()
 const ThemeProvider=({children})=>{

return <Theme.Provider >
    {children}
</Theme.Provider>
}






