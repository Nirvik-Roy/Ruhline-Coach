import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProgramSessionDetails, getSessionValuesresponse, getSessionWhoamIresponse } from '../../../../utils/Program'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'
const Whoami = () => {
    const navigate = useNavigate()
    const { enrollmentId, sessionId, structureId } = useParams()
    const [whoamI, setwhoamI] = useState({})
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

    const getwhoamI = async () => {
        setloading(true)
        const res = await getSessionWhoamIresponse(enrollmentId, structureId)
        if (res?.success) {
            setwhoamI(res?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        getwhoamI()
    }, [])
    return (
        <>
        {loading && <DashboardLoader/>}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Who am I?</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate(`/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}`))}>{sessionData?.program?.name}</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/who-am-i'))} >Who am I?</span></small>
                    </div>
                </div>
                {!loading && <div className='response_details_wrapper'>
                    <h3>Response Details</h3>
                    {whoamI?.questions?.map((e, i) => {
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
                </div>}

            </div>
        </>
    )
}

export default Whoami
