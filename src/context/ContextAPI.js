import { createContext, useEffect, useState } from "react";

// export const UserContext = createContext();
const UserContext = createContext();

// export const url = ;

 const UserData =  ({children})=>{
    const [data,setData] = useState([]);

    const getUserData = async ()=>{
        try {
        console.log('------------------------')
            let res = await fetch('/getUserData',{
                method:"GET"
            });
        res = await res.json();
        setData(res);
        } catch (error) {
            console.log('getUserData',error)
        }
    }

    useEffect(()=>{
        let timeOut = setTimeout(()=>{
            getUserData();
        },200)
        return ()=> clearTimeout(timeOut)
    },[]);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export {UserData,UserContext}

// export const intialState = null;

// export const reducer = (state,action)=>{
//     if(action.type === 'USER'){
//         return action.payload;
//     }
//     return state;
// }