import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { LocationProvider } from './context/locationContext'
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
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import ResendEmail from './view/Auth/ResendEmail'
import ForgotPassword from './view/Auth/ForgotPassword'
import EditCoachProfile from './view/CoachProfile/EditCoachProfile'
import CoachProfile from './view/CoachProfile/CoachProfile'
import SingleCreatedPrograms from './view/Programs/SingleCreatedPrograms/SingleCreatedPrograms.jsx'
import CardGameModule from './view/Programs/SingleCreatedPrograms/ProgramModule/CardGameModule/CardGameModule.jsx'
import CardGameQuestions from './view/Programs/SingleCreatedPrograms/ProgramModule/CardGameModule/CardGameQuestions.jsx'
import WheelOfLifeModule from './view/Programs/SingleCreatedPrograms/ProgramModule/WheelOfLifeModule/WheelOfLifeModule.jsx'
import ProgramTable from './view/Programs/ProgramTable/ProgramTable.jsx'
import FindYourMotivationModule from './view/Programs/SingleCreatedPrograms/ProgramModule/FindYourMotivationModule/FindYourMotivationModule.jsx'
import WhoamIModule from './view/Programs/SingleCreatedPrograms/ProgramModule/WhoamIModule/WhoamIModule.jsx'
import ValuesModule from './view/Programs/SingleCreatedPrograms/ProgramModule/ValuesModule/ValuesModule.jsx'
import SinglelifeElement from './view/Programs/SingleCreatedPrograms/ProgramModule/WheelOfLifeModule/SinglelifeElement.jsx'
import QuotesCategories from './view/Programs/SingleCreatedPrograms/ProgramModule/QuotesCategories/QuotesCategories.jsx'
import SingleQutoesCategories from './view/Programs/SingleCreatedPrograms/ProgramModule/QuotesCategories/SingleQutoesCategories.jsx'
import { useEffect } from 'react'
import ValuesIntermediate from './view/Programs/SingleCreatedPrograms/ProgramModule/IntermediateSteps/ValuesIntermediate.jsx'
import CommonMistakes from './view/Programs/SingleCreatedPrograms/ProgramModule/IntermediateSteps/CommonMistakes.jsx'
import EachGoalQuestions from './view/Programs/SingleCreatedPrograms/ProgramModule/IntermediateSteps/EachGoalQuestions.jsx'
import GoalSettingsPage from './view/Programs/SingleCreatedPrograms/ProgramModule/IntermediateSteps/GoalSettingsPage.jsx'
import TheYMethod from './view/Programs/SingleCreatedPrograms/ProgramModule/IntermediateSteps/TheYMethod.jsx'
import CoachAvailabilityTable from './view/Programs/SingleCreatedPrograms/CoachAvailablityTable/CoachAvailabilityTable.jsx'
function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: '0',
      behavior: 'instant'
    })
  }, [location.pathname])
  return (
    <>

      <LocationProvider>
        <Toaster position='top-right'/>
        <ScrollTop />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/verify-email' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/associate-email' element={<EmailAssociate />} />
          <Route path='/resend-email' element={<ResendEmail />} />
          <Route path='/reset-password' element={<Createpassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={<MainLayout />}>
              <Route path='coach-profile' element={<CoachProfile />} />
              <Route path='appoinments' element={<Appoinments />} />
              <Route path='appoinments/program/:id' element={<AppoinmentPrograms />} />
              <Route path='appoinments/program/:id/values' element={<ProgramValues />} />
              <Route path='appoinments/program/:id/goal' element={<ProgramGoal />} />
              <Route path='appoinments/program/:id/create-goal' element={<CreateGoal />} />
              <Route path='appoinments/goal/view-goal/:id' element={<ViewGoal />} />
              <Route path='appoinments/program/:id/who-am-i' element={<Whoami />} />
              <Route path='appoinments/program/:id/card-game' element={<Cardgame />} />
              <Route path='appoinments/program/:id/wheel-life' element={<WheelOfLife />} />
              <Route path='appoinments/program/:id/habit-tracker' element={<Habitracker />} />
              <Route path='edit-profile/:id' element={<EditCoachProfile />} />
              <Route path='program' >
                <Route path='' element={<ProgramTable />} />
                <Route path='single-program/:id' element={<SingleCreatedPrograms />} />
                <Route path='single-program/:id/card-game/:moduleId' element={<CardGameModule />} />
                <Route path='single-program/card-game/:id/questions/:moduleId' element={<CardGameQuestions />} />
                <Route path='single-program/wheel-of-life/:id/life-elements/:moduleId' element={<WheelOfLifeModule />} />
                <Route path='single-program/:id/wheel-of-life/life-element/:moduleId/:elementId' element={<SinglelifeElement />} />
                <Route path='single-program/:id/motivation/:moduleId' element={<FindYourMotivationModule />} />
                <Route path='single-program/:id/who-Am-I/:moduleId' element={<WhoamIModule />} />
                <Route path='single-program/:id/values/:moduleId' element={<ValuesModule />} />

                <Route path='single-program/:id/quote-categories/:moduleId' element={<QuotesCategories />} />

                <Route path='single-program/:id/quote-categories/:moduleId/quotes/:elementId' element={<SingleQutoesCategories />} />

                <Route path='single-program/:id/values-itermediate/:moduleId' element={<ValuesIntermediate />} />

                <Route path='single-program/:id/common-mistakes/:moduleId' element={<CommonMistakes />} />

                <Route path='single-program/:id/each-goal/:moduleId' element={<EachGoalQuestions />} />

                <Route path='single-program/:id/goal-settings/:moduleId' element={<GoalSettingsPage />} />

                <Route path='single-program/:id/y-method/:moduleId' element={<TheYMethod />} />

                <Route path='single-program/:id/check-availiablity' element={<CoachAvailabilityTable />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </LocationProvider>
    </>

  )
}

export default App
