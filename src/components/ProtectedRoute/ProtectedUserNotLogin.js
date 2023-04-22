import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedUserNotLogin(props) {
    const navigate = useNavigate();
    const {Component} = props;
    useEffect(()=>{
        if( !localStorage.getItem('userLogin')){
            navigate('/signin')
        }
    },[])

  return (
    <><Component  /> </>
  )
}
