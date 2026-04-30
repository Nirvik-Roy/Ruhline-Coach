import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import arrowRight from '../../../../assets/Chevron Right.svg'
import arrowDown from '../../../../assets/Chevron.svg'
import { fetchProgramSessionDetails, getSessioncardgameresponse } from '../../../../utils/Program'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'
const Cardgame = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState();
    const { enrollmentId, sessionId, structureId } = useParams()
    const [cardgame, setcardgame] = useState({})
    const [loading, setloading] = useState(false)
    const [sessionData, setsessionData] = useState({})

    const getSessionDetails = async () => {
        setloading(true)
        const res = await fetchProgramSessionDetails(enrollmentId, sessionId)
        if (res?.success) {
            setsessionData(res?.data)
            setloading(false)
        }
        setloading(false)
    }
    useEffect(() => {
        if (enrollmentId && sessionId) {
            getSessionDetails()
        }
    }, [])

    const getcardgame = async () => {
        setloading(true)
        const res = await getSessioncardgameresponse(enrollmentId, structureId)
        if (res?.success) {
            setcardgame(res?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        getcardgame()
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
            {loading && <DashboardLoader />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Card Game</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate(`/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}`))}>{sessionData?.program?.name}</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/card-game'))} >Card Game</span></small>
                    </div>

                </div>
                {!loading && <div className='response_details_wrapper'>
                    <h3>Response Details</h3>
                    {cardgame?.question_sets?.map((e, i) => (
                        <div className='response_set_wrapper'>
                            <div className='response_set_head'>
                                <h5>Response Set {i + 1}</h5>
                                <hr />
                                <div onClick={(() => indexFunction(i))} className='arrow_btn' style={index == i ? {
                                    background: 'var(--primary-color)',
                                } : {}}>
                                    {index == i && <img src={arrowDown} />}
                                    {index != i && <img src={arrowRight} />}
                                </div>
                            </div>

                            {index == i && <>
                                {e?.questions?.map((e, i) => {
                                    if (e?.type == 'descriptive') {
                                        return (
                                            <>
                                                <h4>{i + 1}.{e?.question_text}</h4>
                                                <p>{e?.answer?.answer_text}</p>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <h4>{i + 1}. {e?.question_text}</h4>
                                                {e?.answer?.answer_options?.map((answer) => (
                                                    <p>{answer}</p>
                                                ))}
                                                <p>{e?.answer?.answer_option}</p>
                                            </>
                                        )
                                    }
                                })}
                                
                                <h2 style={{
                                    fontSize:'17px',
                                    margin:'20px 0',
                                    fontWeight:'600'
                                }}>Selected Cards</h2>
                                <div className='selected_cards_grid_wrapper'>
                                    {e?.submitted_card_selection?.selected_cards?.map((e, i) => (
                                        <div className='selected_card' key={i}>
                                            <h6>{i + 1}</h6>
                                            <h5>{e.name}</h5>
                                            <span>{e?.description}</span>
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
                            {cardgame?.core_values?.map((e, i) => (
                                <div className='selected_card' key={i}>
                                    <h6>{i+1}</h6>
                                    <h5>{e.name}</h5>
                                    <span>{e?.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Cardgame
