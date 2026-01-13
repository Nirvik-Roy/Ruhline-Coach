import React, { useState } from 'react'
import './AppoinmentProgram.css'
import img from '../../../../assets/Group 1597882967 (1).png'
import user from '../../../../assets/User Info.png'
import icon1 from '../../../../assets/Group (2).svg'
import icon2 from '../../../../assets/Layer_1 (5).svg'
import icon3 from '../../../../assets/Group (3).svg'
import icon4 from '../../../../assets/Frame (1).svg'
import icon5 from '../../../../assets/Icon (3).svg'
import icon6 from '../../../../assets/Layer_1 (6).svg'
import icon7 from '../../../../assets/Group 1597882969 (1).svg'
import tick from '../../../../assets/Layer_1 (7).svg'
import lock from '../../../../assets/lock.svg'
import { Link } from 'react-router-dom'
import ModuleUnlockModal from '../../../Modal/ModuleUnlockModal'
const AppoinmentPrograms = () => {
    const [modal, setModal] = useState(false);
    const [title, setTile] = useState('');
    const [index, setIndex] = useState()
    const [programData, setProgramData] = useState([
        {
            id: 1,
            img: icon1,
            title: 'Values',
            tick: true,
            lock: false
        },
        {
            id: 2,
            img: icon2,
            title: 'Card Game',
            tick: true,
            lock: false,
        },
        {
            id: 3,
            img: icon3,
            title: 'Wheel of Life',
            tick: false,
            lock: true,
        },
        {
            id: 4,
            img: icon4,
            title: 'Goal Settings',
            tick: false,
            lock: true,

        },
        {
            id: 5,
            img: icon5,
            title: 'Find your Motivation',
            tick: false,
            lock: true,

        },
        {
            id: 6,
            img: icon6,
            title: 'Habit Tracker',
            tick: false,
            lock: true,

        },
        {
            id: 6,
            img: icon7,
            title: 'Who am I?',
            tick: false,
            lock: true,

        },
    ])

    const ModalFunc = (title, i) => {
        setTile(title)
        setIndex(i)
        setModal(true)
    }

    const unlockModulefunc = () => {
        const copyData = [...programData];
        copyData[index].lock = false;
        copyData[index].tick = true;
        setProgramData(copyData)
        setModal(false)
    }

    return (
        <>
            {modal && <ModuleUnlockModal title={title} setModal={setModal} unlockModulefunc={unlockModulefunc} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <h2>Program 1</h2>
                </div>

                <div className='appoinment_program_wrapper'>
                    <div className='appoinment_porgram_img'>
                        <img src={img} />
                    </div>

                    <div className='appoinment_program_details_wrapper'>
                        <p>Details</p>
                        <img src={user} />
                        <h4>Customer Name: <span>Bidisha Bhowmick</span></h4>
                        <div className='appoinment_program_name_wrapper'>
                            <h4>Program Name: <span>Program 1</span></h4>
                            <h4>Session number: <span>2</span></h4>
                            <h4>Session Duration: <span>120mins</span></h4>
                        </div>
                    </div>
                </div>

                <div className='customer_journey_wrapper'>
                    <h2>Customer Journey</h2>

                    <div className='customer_journey_cards_wrapper'>
                        {programData.map((e, i) => (
                            <div onClick={(() => e.lock && ModalFunc(e.title, i))} className='customer_journey_card'>
                                <img src={e.tick ? tick : e.lock ? lock : ''} style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px'
                                }} />
                                <img src={e.img} />
                                <p>{e.title}</p>
                                {!e.lock && <Link onClick={((e) => {
                                    e.stopPropagation()
                                })}>View</Link>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppoinmentPrograms
