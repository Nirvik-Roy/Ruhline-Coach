import Button from '../../../Components/Button'
import AppoinmentCalendar from './AppoinmentCalendar/AppoinmentCalendar'
import AppoinmentViewModal from '../../Modal/AppoinmentViewModal'
import AddBreakModal from '../../Modal/AddBreakModal'
import WorkingHoursModal from '../../Modal/WorkingHoursModal'
import './Appoinments.css'
import { useState } from 'react'
const Appoinments = () => {
  const [state, setState] = useState({
    viewWorking: false,
    break: false
  })
  return (
    <>
      <div className='dashboard_container'>
        <div className='appointes_head_wrapper'>
          <h2>Appointments</h2>
          <div className='appointments_button_wrapper'>
            <div onClick={(() => setState({
              viewWorking: true,
              break: false
            }))}>
              <Button styles={{
                border: '1px solid var(--primary-color)',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--primary-color)'
              }} children={'View Working hours'} />
            </div>
            <div onClick={(() => setState({
              viewWorking: false,
              break: true
            }))}>
              <Button children={'Add Break/ Leave'} />
            </div>

          </div>
        </div>
        {state.viewWorking && <WorkingHoursModal setState={setState} />}
        {state.break && <AddBreakModal setState={setState} />}
        <AppoinmentCalendar />
      </div>
    </>
  )
}

export default Appoinments
