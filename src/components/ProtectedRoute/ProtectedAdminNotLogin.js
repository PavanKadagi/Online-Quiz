import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProtectedAdminNotLogin(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('adminLogin')){
            navigate('/admin')
        }
    },[])
  return (
    <><Component/></>
  )
}
