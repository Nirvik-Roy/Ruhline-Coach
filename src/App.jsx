import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './view/Auth/Login'
import Register from './view/Auth/Register'
import EmailAssociate from './view/Auth/EmailAssociate'
import ScrollTop from './Components/ScrollTop/ScrollTop'
import Createpassword from './view/Auth/Createpassword'
import MainLayout from './MainLayout/MainLayout'
import Appoinments from './view/Dashboard/Appoinments/Appoinments'
import AppoinmentPrograms from './view/Dashboard/Appoinments/AppoinmentProgram/AppoinmentPrograms'
import ProgramValues from './view/Dashboard/Appoinments/AppoinmentProgram/ProgramValues'
import ProgramGoal from './view/Dashboard/Appoinments/AppoinmentProgram/ProgramGoal'
import CreateGoal from './view/Dashboard/Appoinments/AppoinmentProgram/CreateGoal'
import ViewGoal from './view/Dashboard/Appoinments/AppoinmentProgram/ViewGoal'
import Whoami from './view/Dashboard/Appoinments/AppoinmentProgram/Whoami'
import Cardgame from './view/Dashboard/Appoinments/AppoinmentProgram/Cardgame'
import WheelOfLife from './view/Dashboard/Appoinments/AppoinmentProgram/WheelOfLife'
import Habitracker from './view/Dashboard/Appoinments/AppoinmentProgram/Habitacker'

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
             <Route path='appoinments/program/:id' element={<AppoinmentPrograms/>}/>
             <Route path='appoinments/program/:id/values' element={<ProgramValues/>}/>
             <Route path='appoinments/program/:id/goal' element={<ProgramGoal/>}/>
             <Route path='appoinments/program/:id/create-goal' element={<CreateGoal/>} />
             <Route path='appoinments/goal/view-goal/:id' element={<ViewGoal/>}/>
             <Route path='appoinments/program/:id/who-am-i' element={<Whoami/>}/>
             <Route path='appoinments/program/:id/card-game' element={<Cardgame/>}/>
             <Route path='appoinments/program/:id/wheel-life' element={<WheelOfLife/>}/>
             <Route path='appoinments/program/:id/habit-tracker' element={<Habitracker/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
