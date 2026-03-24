import React , {createContext,useState,useMemo, useContext} from "react";

// create global context(containder ) -> create context

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Create a provider component 
const UserProvider = ({children})=>{
    const [user, setUser] = useState(()=>{
        const StoreUser = localStorage.getItem("user");
        try{
            return StoreUser ? JSON.parse(StoreUser) : null;
        }catch{
            return null;
        }
    })
    
    // update user and store in local storage
    const updateUser = (userData)=>{
        setUser(userData);
        localStorage.setItem('user',JSON.stringify(userData));
    }

    // clear user data and remove from local storage
    const clearUser = ()=>{
        setUser(null);
        localStorage.removeItem('user');
    }

    const value = useMemo(()=>({
        user,
        updateUser,
        clearUser,
        isAuthenticated: !!user
    }),[user]);

    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;