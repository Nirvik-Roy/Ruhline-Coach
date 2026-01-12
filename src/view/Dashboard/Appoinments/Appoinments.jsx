import Button from '../../../Components/Button'
import AppoinmentCalendar from './AppoinmentCalendar/AppoinmentCalendar'
import './Appoinments.css'
const Appoinments = () => {
  return (
    <>
      <div className='dashboard_container'>
        <div className='appointes_head_wrapper'>
            <h2>Appointments</h2>
            <div className='appointments_button_wrapper'>
                <Button styles={{
                    border:'1px solid var(--primary-color)',
                    borderRadius:'8px',
                    background:'transparent',
                    color:'var(--primary-color)'
                }} children={'Update Working shift'}/>

                <Button children={'Add Break/ Leave'}/>
            </div>
        </div>

        <AppoinmentCalendar/>
      </div>
    </>
  )
}

export default Appoinments
