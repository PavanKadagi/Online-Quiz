import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/Theme'
const FooterDiv = styled.section`
margin: 3rem 0 1rem 0;
position: static;
bottom:0;
left: 0;
right: 0;
display: flex;
justify-content: center;
align-items: center;

.footer{
border-top: .1rem solid #f1f1f1;
padding: 1rem;
border-bottom: .1rem solid #f1f1f1;
text-align: start;

h2{
    color: ${({theme})=>theme.colors.blue};
    font-size: 2rem;
}

}

`

export default function Footer() {
  return (
    <FooterDiv>
        <div className='footer'>
        <h2>© Developed By Mr Pavan Kadagi </h2>
    <p>User email pavan123@gmail.com And Password pass.</p>
    <p>For admin login go to '/admin' email admin@gmail.com And Password admin.</p>
        </div>
    </FooterDiv>
  )
}
