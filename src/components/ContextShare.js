import React, { createContext, useState } from 'react'
export const registerContext = createContext()
export const deleteContext = createContext()
export const editContext = createContext()

function ContextShare({children}) {
    //to holde register component data
    const [registerData,setRegisterData] = useState("")
    const [deleteData,setDaleteData] = useState("")
    const [editData,setEditData] =useState("")
  return (
    <>
        <registerContext.Provider value={{registerData,setRegisterData}}>
          <deleteContext.Provider value={{deleteData,setDaleteData}}>  
           <editContext.Provider value={{editData,setEditData}}> 
            {children}
           </editContext.Provider>
          </deleteContext.Provider>
        </registerContext.Provider>
    
    </>
  )
}

export default ContextShare