import { useNavigate } from 'react-router-dom'
import Button from '../../../../Components/Button'
import eye from '../../../../assets/elements.svg'
import Pagination from '../../../../Components/Pagination/Pagination.jsx'
import HabitTrackerModal from '../../../Modal/HabitTrackerModal.jsx'
import { useState } from 'react'
import CreateHabitTrackerModal from '../../../Modal/CreateHabitTrackerModal.jsx'
const Habitracker = () => {
    const navigate = useNavigate();
    const [habitModal, sethabitModal] = useState(false);
    const [habitTracker, sethabitTracker] = useState(false);
    const [data, setData] = useState([
        {
            id: 1,
            habitName: 'Habit Tracker 1',
            limits: '20 Lorem Ipsum',
            createdBy: 'coach',
            frequency: 'daily',
            reminderTime: '09:30 AM'
        },
        {
            id: 2,
            habitName: 'Habit Tracker 1',
            limits: '20 Lorem Ipsum',
            createdBy: 'coach',
            frequency: 'daily',
            reminderTime: '09:30 AM'
        },
        {
            id: 3,
            habitName: 'Habit Tracker 1',
            limits: '20 Lorem Ipsum',
            createdBy: 'coach',
            frequency: 'daily',
            reminderTime: '09:30 AM'
        },
        {
            id: 4,
            habitName: 'Habit Tracker 1',
            limits: '20 Lorem Ipsum',
            createdBy: 'coach',
            frequency: 'daily',
            reminderTime: '09:30 AM'
        },
    ])
    return (
        <>
            {habitModal && <HabitTrackerModal sethabitModal={sethabitModal} />}
            {habitTracker && <CreateHabitTrackerModal sethabitTracker={sethabitTracker} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Habit Tracker</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/card-game'))} >Habit Tracker</span></small>
                    </div>
                    <div onClick={(() => sethabitTracker(true))}>
                        <Button children={'Create Habit'} />
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Habit Name</th>
                                <th>Limits</th>
                                <th>Created by</th>
                                <th>Frequency</th>
                                <th>Reminder time </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((e) => (
                                <tr key={e}>
                                    <td style={{
                                        padding: '20px 0'
                                    }}>Habit Tracker 1</td>
                                    <td style={{
                                        padding: '20px 0'
                                    }}>20 Lorem Ipsum</td>
                                    <td style={{
                                        padding: '20px 0'
                                    }}>Coach</td>
                                    <td style={{
                                        padding: '20px 0'
                                    }}>Daily</td>
                                    <td style={{
                                        padding: '20px 0'
                                    }}>09:30 AM</td>
                                    <td onClick={(() => sethabitModal(true))} style={{
                                        padding: '20px 0'
                                    }}>
                                        <img src={eye} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </>
    )
}

export default Habitracker
