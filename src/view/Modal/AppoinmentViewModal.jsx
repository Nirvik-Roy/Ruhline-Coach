import { Link } from 'react-router-dom'
import './Modal.css'
const AppoinmentViewModal = ({ setshowModal }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setshowModal(false))}></div>
            <div className='modal_div'>
                <h4>#ST456666</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setshowModal(false))}></i>
                <div className='modal_disputes_details'>
                    <p>Client Name: <span>Bidisha Bhowmick</span></p>
                    <p>Date: <span>07/06/2026</span></p>
                    <p>Time: <span>10:00AM-10:30AM</span></p>
                    <p>Program Booked: <span>Program 1</span></p>
                    <Link to={'/dashboard/appoinments/program/1'}>Join Now</Link>
                </div>
            </div>
        </>
    )
}

export default AppoinmentViewModal
