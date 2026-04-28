import { Link } from 'react-router-dom'
import './Modal.css'
import ModalLoader from '../../Components/Loaders/ModalLoader.jsx'
import { useEffect, useState } from 'react'
import { toLocalDate, toLocalTime } from '../../utils/dateUtils.js'
const AppoinmentViewModal = ({ setshowModal, events, eventId }) => {
    const [singleEvent, setsingleEvent] = useState({})
    useEffect(() => {
        if (eventId) {
            const filteredData = events?.filter((element) => element.id == eventId)
            setsingleEvent(...filteredData)
        }
    }, [eventId, events])

    return (
        <>
            <div className='modal_wrapper' onClick={(() => setshowModal(false))}></div>
            <div className='modal_div'>
                <h4>#{singleEvent?.id}</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setshowModal(false))}></i>
                <div className='modal_disputes_details'>
                    <p>Client Name: <span>{singleEvent ?.extendedProps?.customer?.name}</span></p>
                    <p>Date: <span>{toLocalDate(singleEvent?.start)}</span></p>
                    <p>Time: <span>{toLocalTime(singleEvent?.start)}</span></p>
                    <p>Program Booked: <span>{singleEvent?.extendedProps
                        ?.program?.name}</span></p>
                    <Link to={`/dashboard/appoinments/program/${singleEvent?.extendedProps?.enrollmentId}/session/${singleEvent?.extendedProps?.sessionNumber}`}>Join Now</Link>
                </div>
            </div>
        </>
    )
}

export default AppoinmentViewModal
