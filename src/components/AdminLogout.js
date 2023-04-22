import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

export default function AdminLogout() {
    const navigate = useNavigate();

    const logoutAdmin =async ()=>{
        let res = await fetch('/admin/logout',{
            method:"GET"
        });
        res = await res.json();
        if(res.message){
            localStorage.clear()
            navigate('/admin')
            let timeOut =  setTimeout(()=>{
                toast.success(res.message)
               },500);
               return ()=>clearTimeout(timeOut)
        }
        if(res.error || !res){
            navigate('/admin/home')
        }
    }

    useEffect(()=>{
        
        let timeOut = setTimeout(()=>{
        logoutAdmin()
        },300)
        return ()=> clearTimeout(timeOut)
    },[])

  return (
    <Toaster
    position="top-center"
    reverseOrder={false}
  />
  )
}
