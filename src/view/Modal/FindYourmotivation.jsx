import { useEffect, useState } from 'react'
import tick from '../../assets/Layer_1 (1).svg'
import { useParams } from 'react-router-dom'
import { getSessionMotivationresponse } from '../../utils/Program'
import DashboardLoader from '../../Components/Loaders/DashboardLoader'
import ModalLoader from '../../Components/Loaders/ModalLoader'
const FindYourmotivation = ({ setmotivationModel, structureId }) => {
    const [loading, setloading] = useState(false)
    const [motivationdata, setmotivationdata] = useState([])
    const { enrollmentId, sessionId } = useParams()
    const getMotivation = async () => {
        setloading(true)
        const res = await getSessionMotivationresponse(enrollmentId, structureId)
        if (res?.success) {
            setmotivationdata(res?.data?.words)
        }
        setloading(false)
    }

    useEffect(() => {
        if (structureId) {
            getMotivation()
        }
    }, [])
    return (
        <>
            {loading && <DashboardLoader />}
            <div className="modal_wrapper" onClick={(() => setmotivationModel(false))}></div>
            <div className="modal_div" style={{
                minHeight: '20vh'
            }}>
                {loading && <ModalLoader />}
                {!loading && <>
                    <h4>Find your Motivation</h4>
                    <i class="fa-solid fa-xmark" onClick={(() => setmotivationModel(false))}></i>
                    <h3 style={{
                        fontSize: '18px',
                        color: 'var(--text-color)',
                        fontWeight: '600',
                        margin: '20px 0'
                    }}>Response Details</h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '10px'
                    }}>
                        {motivationdata?.map((e) => (
                            <p style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '10px',
                                textTransform: 'uppercase'
                            }}>{e?.guess?.guess_word}<img src={e?.guess?.is_correct && tick} /></p>
                        ))}
                    </div>
                </>}

            </div>
        </>
    )
}

export default FindYourmotivation
