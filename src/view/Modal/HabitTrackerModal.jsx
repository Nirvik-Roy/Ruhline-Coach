import React from 'react'

const HabitTrackerModal = ({sethabitModal}) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(()=>sethabitModal(false))}></div>
            <div className='modal_div'>
                <h4>Habit Tracker</h4>
                <i class="fa-solid fa-xmark" onClick={(()=>sethabitModal(false))}></i>
                <div className='modal_disputes_details'>
                    <p>Habit type: <span>Habit type 1</span></p>
                    <p>Habit Name: <span>Lorem Ipsum</span></p>
                    <p>Created by: <span>Coach</span></p>
                    <p>Frequency: <span>Weekly</span></p>
                    <p>Days: <span>Tue | Thu | Fri</span></p>
                    <p>Limit: <span>20</span></p>
                    <p>Combine with goal: <span>Goal 1</span></p>
                    <p>Reminder time: <span> 09:30 AM</span></p>
                </div>
            </div>
        </>
    )
}

export default HabitTrackerModal
