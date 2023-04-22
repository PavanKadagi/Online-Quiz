import { createGlobalStyle } from "styled-components";

export const GlobleStyle = createGlobalStyle`
/* add lora font famliy */
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html{
  font-size: 62.5%;
}




p{
  color:${({ theme }) => theme.colors.mainTextColor};
  font-size:1.3rem;
  line-height:1.5;
  font-weight:400;
}

label,span{
    color:${({ theme }) => theme.colors.mainTextColor};
  font-size:1.3rem;
  
  font-weight:500;
}

a{
  text-decoration: none;
}

h1,
h2,
h3,
h4,h5,h6{
  color: #8e8d8a;
  font-family: "Lora",serif;
    color:${({ theme }) => theme.colors.textColor};
    font-size: 2.5rem;
    transition: all 0.5s linear;
}


h1{
  text-transform: capitalize;
  font-weight: bold;
}

/* resuable code */
.container{
  max-width: 120rem;
  margin: 0 auto;
}




/* common for signup,signin,about us page */
.container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw; 
  ${"" /* min-height: 100vh; */}
  flex-direction: column;
}


/* glassy effect */
body {
  background-color: #fff;
  background-repeat: no-repeat;
}

.glassy{
  box-shadow: 0 .1rem .2rem rgba(0,0,0,0.2);
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row !important;
}

${
  "" /* .glassy {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 4rem 4rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
} */
}

${
  "" /* .glassy:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  margin: -20px;
} */
}

/* glassy effect  end*/




button {
          max-width: auto;
          font-weight: 500;
          margin-top: 1rem;
          border: 0.1rem solid rgb(98 84 243);
    color: ${({ theme }) => theme.colors.blue};
              padding: 1rem 2.5rem;
          background: none;
          text-transform: capitalize;
          font-size: 1.3rem;
          ${"" /* border-radius: 2rem; */}
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.blue};
      color: #fff;
            transform: scale(0.9);
          }
}
        

`;
