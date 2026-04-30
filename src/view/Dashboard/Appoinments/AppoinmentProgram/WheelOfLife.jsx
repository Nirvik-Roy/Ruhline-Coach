import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import arrowRight from '../../../../assets/Chevron Right.svg'
import arrowDown from '../../../../assets/Chevron.svg'
import Rating from '../../../../Components/Rating/Rating';
import { fetchProgramSessionDetails, getSessionWheelofLiferesponse } from '../../../../utils/Program';
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader';
const WheelOfLife = () => {
    const { enrollmentId, sessionId } = useParams()
    const navigate = useNavigate();
    const [index, setIndex] = useState();
    const [loader, setloader] = useState(false)
    const [sessionData, setsessionData] = useState({})
    const [wheeloflifeData, setwheelofLifeData] = useState({})
    const getSessionDetails = async () => {
        setloader(true)
        const res = await fetchProgramSessionDetails(enrollmentId, sessionId)
        if (res?.success) {
            setsessionData(res?.data)
            setloader(false)
        }
        setloader(false)
    }
    useEffect(() => {
        if (enrollmentId && sessionId) {
            getSessionDetails()
        }
    }, [])


    const getWheeloflifeResponse = async () => {
        setloader(true)
        const res = await getSessionWheelofLiferesponse(enrollmentId, sessionId)
        if (res?.success) {
            setwheelofLifeData(res?.data)
            setloader(false)
        }
        setloader(false)
    }

    useEffect(() => {
        getWheeloflifeResponse()
    }, [])


    const indexFunction = (i) => {
        if (index == i) {
            setIndex()
        } else {
            setIndex(i)
        }
    }
    return (
        <>
            {loader && <DashboardLoader />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Wheel of Life</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate(`/dashboard/appoinments/program/${enrollmentId}/sessions/${sessionId}`))}>{sessionData?.program?.name}</span> / <span >Wheel of Life</span></small>
                    </div>

                </div>
                {!loader && <div className='response_details_wrapper'>
                    {wheeloflifeData?.elements?.map((e, i) => (
                        <div className='response_set_wrapper'>
                            <div className='response_set_head'>
                                <h5 style={{
                                    textTransform: 'capitalize'
                                }}>{e?.name}</h5>
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
                                    <Rating value={e?.rating?.value}/>
                                </div>

                                {e?.questions?.map((ele, i) => {
                                    if (ele?.type == 'descriptive') {
                                        return (
                                            <>
                                                <h4>{i + 1}. {ele?.question_text}</h4>
                                                <p>{ele?.answer?.answer_text}</p>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <h4>{i + 1}. {ele?.question_text}</h4>
                                                {ele?.answer?.answer_options?.map((answer) => (
                                                    <p>{answer}</p>
                                                ))}
                                                <p>{ele?.answer?.answer_option}</p>
                                            </>
                                        )
                                    }
                                })}





                                {/* <h4>Selected Cards</h4>

                                <div className='selected_cards_grid_wrapper'>
                                    {data.map((e, i) => (
                                        <div className='selected_card' key={i}>
                                            <h6>{e.num}</h6>
                                            <h5>{e.title}</h5>
                                            <span>Stability, orderliness, predictability</span>
                                        </div>
                                    ))}
                                </div> */}
                            </>}
                        </div>

                    ))}
                    {/* <div className='response_set_wrapper'>
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
                    </div> */}
                </div>}
            </div>
        </>
    )
}

export default WheelOfLife
