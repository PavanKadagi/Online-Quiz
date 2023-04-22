import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home'
import Logout from './components/Logout';
import PageNotFound from './components/PageNotFound';
import QuizInfo from './components/QuizInfo';
import QuizQues from './components/QuizQues';
import Recovery from './components/Recovery';
import Signin from './components/Signin';
import Signup from './components/Signup';
// import { intialState, reducer, UserContext } from './context/ContextAPI';
import { GlobleStyle } from './styles/GlobalStyle';
import { theme } from './styles/Theme';
import ViewMarks from './components/ViewMarks';
import EmailVerifyed from './components/EmailVerifyed';
import PasswordVerified from './components/PasswordVerified';
import Verification from './components/Verification';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import AdminLogout from './components/AdminLogout';
import NavLayout from './components/Navbar/NavLayout';
import ProtectedUserNotLogin from './components/ProtectedRoute/ProtectedUserNotLogin';
import ProtectedUserLogin from './components/ProtectedRoute/ProtectedUserLogin';
import ProtectedAdminLogin from './components/ProtectedRoute/ProtectedAdminLogin';
import ProtectedAdminNotLogin from './components/ProtectedRoute/ProtectedAdminNotLogin';
import Footer from './components/Footer';


 function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <GlobleStyle />
  
    <Routes>
      <Route path='/'  element={<NavLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<ProtectedUserNotLogin Component={About} />} />
      <Route path='/contact' element={<ProtectedUserNotLogin Component={Contact} />} />
      <Route path='/signup' element={<ProtectedUserLogin Component={Signup} />} />
      <Route path='/signin' element={<ProtectedUserLogin Component={Signin} />} />
      <Route path='/logout' element={<ProtectedUserNotLogin Component={Logout} />} />
      <Route path='/viewmarks' element={<ProtectedUserNotLogin Component={ViewMarks} />} /> 
      <Route path='/quiz/:language' element={<QuizInfo />} />
      </Route>
      <Route path='/test/:language' element={<ProtectedUserNotLogin Component={QuizQues} />} />
      <Route path='/verify' element={<ProtectedUserLogin Component={EmailVerifyed} />} />
      <Route path='/verification' element={<ProtectedUserLogin Component={Verification} />} />
      <Route path='/forget' element={<ProtectedUserLogin Component={Recovery} />} />
      <Route path='/forget-password' element={<ProtectedUserLogin Component={PasswordVerified} />} />
    
      <Route path='/admin' element={<ProtectedAdminLogin Component={AdminLogin } />} />
      <Route path='/admin/home' element={<ProtectedAdminNotLogin Component={AdminHome} />} />
      <Route path='/admin/logout' element={<ProtectedAdminNotLogin Component={AdminLogout} />} />
      <Route path='/*'  element={<PageNotFound />}  />
    </Routes>

    </ThemeProvider>
    </>
  )
}

export default App;


