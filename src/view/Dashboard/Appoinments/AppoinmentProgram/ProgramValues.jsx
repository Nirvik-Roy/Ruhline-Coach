import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionValuesresponse } from '../../../../utils/Program'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader';
const ProgramValues = () => {
    const navigate = useNavigate();
    const { enrollmentId, sessionId, structureId } = useParams()
    const [valuesdata, setvaluesData] = useState({})
    const [loading, setloading] = useState(false)

    const getValuesData = async () => {
        setloading(true)
        const res = await getSessionValuesresponse(enrollmentId, structureId)
        if (res?.success) {
            setvaluesData(res?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        getValuesData()
    }, [])
    return (
        <>
            {loading && <DashboardLoader />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Values</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span  >Values</span></small>
                    </div>
                </div>
                {!loading && <div className='response_details_wrapper'>
                    <h3>Response Details</h3>
                    {valuesdata?.questions?.map((e, i) => {
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

export default ProgramValues
