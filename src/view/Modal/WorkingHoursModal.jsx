import React from 'react'

const WorkingHoursModal = ({ setState }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setState({
                viewWorking: false,
                break: false,
            }))}></div>
            <div className='modal_div'>
                <h4>Working Hours</h4>
                <i onClick={(() => setState({
                    viewWorking: false,
                    break: false,
                }))} class="fa-solid fa-xmark" ></i>
                <div className='modal_disputes_details'>
                    <p>Sun: <span>08:00 AM - 08:00 PM</span></p>
                    <p>Mon: <span>08:00 AM - 08:00 PM</span></p>
                    <p>Tue: <span>08:00 AM - 08:00 PM</span></p>
                    <p>Wed: <span>08:00 AM - 08:00 PM</span></p>
                    <p>Thu: <span>08:00 AM - 08:00 PM</span></p>
                    <p>Fri: <span></span></p>
                    <p>Sat: <span></span></p>

                </div>
            </div>
        </>
    )
}

export default WorkingHoursModal
