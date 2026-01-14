import React from 'react'
import { useNavigate } from 'react-router-dom'

const SupportTable = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Goal Settings</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/goal'))} >Goal Settings</span></small>
                    </div>
                    <Button children={'Create Goal'} />
                </div>
            </div>
        </>
    )
}

export default SupportTable
