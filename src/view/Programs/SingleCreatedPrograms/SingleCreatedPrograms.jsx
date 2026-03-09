import './SingleCreatedPrograms.css'
import SingleProgramDetails from './SingleProgramDetails'
import Button from '../../../Components/Button.jsx'
import ProgramTabs from './ProgramTabs.jsx'
import pencil from '../../../assets/Frame 1597882966.svg'
import eye from '../../../assets/icon.svg'
import icon1 from '../../../assets/Group (2).svg'
import icon2 from '../../../assets/Layer_1 (5).svg'
import icon3 from '../../../assets/Group (3).svg'
import icon4 from '../../../assets/Frame (1).svg'
import icon5 from '../../../assets/Icon (3).svg'
import icon6 from '../../../assets/Layer_1 (6).svg'
import icon7 from '../../../assets/Group 1597882969 (1).svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const SingleCreatedPrograms = () => {
    const navigate = useNavigate()
    const [programData, setProgramData] = useState([
        {
            id: 1,
            img: icon1,
            title: 'Values',
            link: '/dashboard/appoinments/program/1/values'
        },
        {
            id: 2,
            img: icon2,
            title: 'Card Game',
            link: '/dashboard/appoinments/program/1/card-game'
        },
        {
            id: 3,
            img: icon3,
            title: 'Wheel of Life',
            link: '/dashboard/appoinments/program/1/wheel-life'
        },
        {
            id: 4,
            img: icon4,
            title: 'Goal Settings',
            
            link: '/dashboard/appoinments/program/1/goal'
        },
        {
            id: 5,
            img: icon5,
            title: 'Find your Motivation',
            
            link: '/dashboard/appoinment'
        },
        {
            id: 6,
            img: icon6,
            title: 'Habit Tracker',
            
            link: '/dashboard/appoinments/program/1/habit-tracker'
        },
        {
            id: 1,
            img: icon1,
            title: 'Documents',
            link: '/dashboard/appoinments/program/1/values'
        },
        {
            id: 6,
            img: icon7,
            title: 'Who am I?',
            
            link: '/dashboard/appoinments/program/:id/who-am-i'
        },

    ])
    return (
        <>
            <div className='dashboard_container one_time_content_wrapper'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Program123</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> </small>
                    </div>
                </div>
                <SingleProgramDetails />
                <ProgramTabs />

                <div className='module_box_main_wrapper'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>Program Structure</h3>

                    <div className='customer_journey_cards_wrapper' style={{
                    }}>
                        {programData.map((e) => (
                            <div className='customer_journey_card' style={{
                                position:'relative',
                                width:'140px',
                                minWidth:'140px',
                                height:'130px'
                            }}>
                                <div style={{
                                    position:'absolute',
                                    top:'5px',
                                    right:'5px',
                                    display:'flex',
                                    flexDirection:'column',
                                    rowGap:'5px'
                                }}>
                                    <img src={pencil}/>
                                    <img src={eye}/>
                                </div>
                                <img style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px'
                                }} />
                                <img src={e.img} />
                                <p style={{
                                    width:'100px'
                                }}>{e.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleCreatedPrograms
