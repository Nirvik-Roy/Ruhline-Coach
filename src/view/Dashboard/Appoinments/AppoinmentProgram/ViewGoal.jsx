import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreatedGoal = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  return (
    <>
      <div className='dashboard_container'>
        <div className='appointes_head_wrapper'>
          <div>
            <h2>Goal 1</h2>
            <small style={{
              cursor: 'pointer'
            }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/goal'))} >Goal Settings</span> / <span onClick={(() => navigate('/dashboard/appoinments/goal/view-goal/1'))}>View Goal 1</span></small>
          </div>
        </div>

        <div className='view_goal_wrapper'>
          <div className='view_goal_1' style={id > 1 ? { width: '50%' } : { width: '100%' }}>
            <h4>Goal Name: <span>Goal 1</span></h4>
            <h4>Goal Type: <span>Short term</span></h4>
            <h4>Goal Created by: <span>Coach</span></h4>
            <h4>Start date: <span> 27/10/2025</span></h4>
            <h4>Duration: <span>1 week</span></h4>

            <h4>Why is it important?</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

            <h4>Measurable Outcome</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

            <h4>Sub Goal Enabled: No</h4>

            <h4>Motivation</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

            <h4>Reward</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

            <h4>Next Step</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
          {id > 1 && <div className='sub_goal_2'>

            <h4>Sub Goals:</h4>
            <h4>Sub Goal Name: <span>Sub Goal 1</span></h4>
            <h4>Sub Goal Type: <span>Short term</span></h4>
            <h4>Start date: <span>27/10/2025</span></h4>
            <h4>End date: <span>27/10/2025</span></h4>
            <h4>Motivation</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

            <h4>Reward</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
            <h4>Next Step</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>}
        </div>
      </div>
    </>
  )
}

export default CreatedGoal
