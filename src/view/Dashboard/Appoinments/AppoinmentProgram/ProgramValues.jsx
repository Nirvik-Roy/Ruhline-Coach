import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProgramValues = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Values</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/values'))} >Values</span></small>
                    </div>
                </div>
                <div className='response_details_wrapper'>
                    <h3>Response Details</h3>
                    <h4>1. Tell us about ur Working Experience.</h4>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi</p>

                    <h4>2. Skills you know</h4>
                    <p>React Js</p>
                    <p>Wordpress</p>
                    <p>Flutter</p>

                    <h4>3. Have you ever used AI?</h4>
                    <p>Yes</p>
                </div>

            </div>
        </>
    )
}

export default ProgramValues
