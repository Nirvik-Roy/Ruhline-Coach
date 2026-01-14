import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrowRight from '../../../../assets/Chevron Right.svg'
import arrowDown from '../../../../assets/Chevron.svg'
import Rating from '../../../../Components/Rating/Rating';
const WheelOfLife = () => {

    const navigate = useNavigate();
    const [index, setIndex] = useState();
    const data = [
        {
            num: 2,
            title: 'Depression'
        },
        {
            num: 3,
            title: 'Forgiveness'
        },
        {
            num: 4,
            title: 'Loyalty'
        },
        {
            num: 5,
            title: 'Peace'
        },
        {
            num: 6,
            title: 'Health'
        },
        {
            num: 8,
            title: 'Depression'
        },
        {
            num: 9,
            title: 'Forgiveness'
        },
        {
            num: 10,
            title: 'Loyalty'
        },
        {
            num: 11,
            title: 'Peace'
        },
        {
            num: 12,
            title: 'Health'
        },
    ]

    const indexFunction = (i) => {
        if (index == i) {
            setIndex()
        } else {
            setIndex(i)
        }
    }
    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Wheel of Life</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/card-game'))} >Wheel of Life</span></small>
                    </div>

                </div>
                <div className='response_details_wrapper'>
                    {['Anxiety','Depression','Health','Courage','Peace','Forgiveness'].map((e, i) => (
                        <div className='response_set_wrapper'>
                            <div className='response_set_head'>
                                <h5>{e}</h5>
                                <hr />
                                <div onClick={(() => indexFunction(i))} className='arrow_btn' style={index == i ? {
                                    background: 'var(--primary-color)',
                                } : {}}>
                                    {index == i && <img src={arrowDown} />}
                                    {index != i && <img src={arrowRight} />}
                                </div>
                            </div>

                            {index == i && <>
                                <div className='rate_life_elements_wrapper' style={{
                                    marginTop: '15px',
                                    marginBottom: '15px',
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    <h6 style={{
                                        color: 'var(--text-color)',
                                        fontSize: '16px'
                                    }}>Rate Life Elements:</h6>
                                    <Rating />
                                </div>
                                <h4>1. Tell us about ur Working Experience.</h4>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi</p>

                                <h4>2. Skills you know</h4>
                                <p>React Js</p>
                                <p>Wordpress</p>
                                <p>Flutter</p>

                                <h4>3. Have you ever used AI?</h4>
                                <p>Yes</p>

                                <h4>Selected Cards</h4>

                                <div className='selected_cards_grid_wrapper'>
                                    {data.map((e, i) => (
                                        <div className='selected_card' key={i}>
                                            <h6>{e.num}</h6>
                                            <h5>{e.title}</h5>
                                            <span>Stability, orderliness, predictability</span>
                                        </div>
                                    ))}
                                </div>
                            </>}
                        </div>

                    ))}
                    <div className='response_set_wrapper'>
                        <div className='response_set_head'>
                            <h5>Final Selected Cards</h5>
                            <hr />
                            <div className='arrow_btn'>
                                <img src={arrowRight} />
                            </div>
                        </div>


                        <div className='selected_cards_grid_wrapper' style={{
                            marginTop: '15px'
                        }}>
                            {data.map((e, i) => (
                                <div className='selected_card' key={i}>
                                    <h6>{e.num}</h6>
                                    <h5>{e.title}</h5>
                                    <span>Stability, orderliness, predictability</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WheelOfLife
