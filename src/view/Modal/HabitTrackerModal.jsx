import React from 'react'

const formatDays = (days) => {
    if (!days?.length) return '—'
    return days
        .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
        .join(' | ')
}

const HabitTrackerModal = ({ sethabitModal, habit }) => {
    const reminder = habit?.reminder_time
        ? (() => {
            const [h, m] = habit.reminder_time.split(':')
            const hour = Number(h)
            const period = hour >= 12 ? 'PM' : 'AM'
            const hour12 = hour % 12 || 12
            return `${hour12}:${m} ${period}`
        })()
        : '—'

    return (
        <>
            <div className='modal_wrapper' onClick={() => sethabitModal(false)}></div>
            <div className='modal_div'>
                <h4>Habit Tracker</h4>
                <i className='fa-solid fa-xmark' onClick={() => sethabitModal(false)}></i>
                <div className='modal_disputes_details'>
                    <p>Habit type: <span>{habit?.habit_type_name ?? '—'}</span></p>
                    <p>Habit Name: <span>{habit?.habit_name ?? '—'}</span></p>
                    <p>Frequency: <span>{habit?.frequency_label ?? '—'}</span></p>
                    <p>Days: <span>{formatDays(habit?.days_of_week)}</span></p>
                    <p>Limit: <span>{habit?.target_count ?? '—'} per {habit?.target_period ?? '—'}</span></p>
                    <p>Combine with goal: <span>{habit?.linked_goal_name ?? '—'}</span></p>
                    <p>Reminder time: <span>{reminder}</span></p>
                </div>
            </div>
        </>
    )
}

export default HabitTrackerModal
