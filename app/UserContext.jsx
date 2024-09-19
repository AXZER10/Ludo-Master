import React , {useState, createContext,} from "react"

export const UserContext = createContext();
  
export const UserProvider = ({children}) =>{
    const [userDetails, setUserDetails] = useState(null);
    
    const updateUserDetails =(details) =>{
        setUserDetails(details)
    };
    return (
        <UserContext.Provider value={{userDetails, updateUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}