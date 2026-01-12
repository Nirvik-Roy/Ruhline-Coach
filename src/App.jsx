import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './view/Auth/Login'
import Register from './view/Auth/Register'
import EmailAssociate from './view/Auth/EmailAssociate'
import ScrollTop from './Components/ScrollTop/ScrollTop'
import Createpassword from './view/Auth/Createpassword'
import MainLayout from './MainLayout/MainLayout'
import Appoinments from './view/Dashboard/Appoinments/Appoinments'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/associate-email' element={<EmailAssociate />} />
          <Route path='/create-password' element={<Createpassword/>}/>
          <Route path='/dashboard' element={<MainLayout/>}>
             <Route path='appoinments' element={<Appoinments/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
