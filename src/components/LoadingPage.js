import React from 'react'
import styled from 'styled-components'

const Loader = styled.section`
margin-top:2rem ;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default function LoadingPage() {
  return (
    <Loader  className='container '>
    <div className="loader"></div>
        <h1 >Loading Page...</h1>
    </Loader>
  )
}
