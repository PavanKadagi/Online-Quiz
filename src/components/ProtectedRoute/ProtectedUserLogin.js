import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedUserLogin(props) {
    const navigate = useNavigate();
    const {Component} = props;
    useEffect(()=>{
        if(localStorage.getItem('userLogin')){
            navigate('/')
        }
    },[])
  return (
    <><Component /></>
  )
}
