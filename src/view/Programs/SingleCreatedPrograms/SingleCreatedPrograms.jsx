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
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EditDocumentModal from '../../Modal/EditDocumentModal.jsx'
import UploadDocumentsModal from '../../Modal/UploadDocumentsModal.jsx'
import { getCoachProgramsStructure, getCoachSinglePrograms } from '../../../utils/Program.js'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
const SingleCreatedPrograms = () => {
    const navigate = useNavigate()
    const [documentModuleId, setdocumentModuleId] = useState()
    const [uploadModal, setuploadModal] = useState(false);
    const [programStructureData, setprogramStructureData] = useState([])
    const [singleProgramData, setsingleProgramData] = useState([]);
    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const fetchSinglePrograms = async () => {
        try {
            setloading(true)
            const res = await getCoachSinglePrograms(id);
            if (res?.success) {
                setsingleProgramData(res?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const fetchProgramStructure = async () => {
        try {
            setloading(true)
            const res = await getCoachProgramsStructure(id);
            if (res?.success) {
                setprogramStructureData(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchSinglePrograms()
            fetchProgramStructure()
        }
    }, [id])


    return (
        <>
            {uploadModal && <UploadDocumentsModal documentModuleId={documentModuleId} setuploadModal={setuploadModal} />}
            {loading && <Loaders />}
            <div className='dashboard_container one_time_content_wrapper'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>{singleProgramData?.name}</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/program'))}>Programs</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}`))}>{singleProgramData?.name}</span> </small>
                    </div>

                    <Button onClick={(() => navigate(`/dashboard/program/single-program/${id}/check-availiablity`))} children={'Check Availablity'}/>
                </div>
                <SingleProgramDetails singleProgramData={singleProgramData} />
                <ProgramTabs singleProgramData={singleProgramData} />

                <div className='module_box_main_wrapper'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>Program Structure</h3>

                    <div className='customer_journey_cards_wrapper' style={{
                    }}>
                        {programStructureData?.length <= 0 && <p style={{
                            color: 'var(--primary-color)',
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>No modules added....</p>}
                        {programStructureData?.map((e) => (
                            <div className='customer_journey_card' style={{
                                position: 'relative',
                                width: '140px',
                                minWidth: '140px',
                                height: '130px'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    rowGap: '5px'
                                }}>
                                    {e?.can_edit && <img onClick={(() => {
                                        const data = {
                                            'Values': `/dashboard/program/single-program/${id}/values/${e?.id}`,
                                            'Find your Motivation': `/dashboard/program/single-program/${id}/motivation/${e?.id}`,
                                            'Who am I': `/dashboard/program/single-program/${id}/who-Am-I/${e?.id}`,
                                            'Wheel of Life': `/dashboard/program/single-program/wheel-of-life/${id}/life-elements/${e?.id}`,
                                            'Card Game': `/dashboard/program/single-program/${id}/card-game/${e?.id}`,
                                            'Quote': `/dashboard/program/single-program/${id}/quote-categories/${e?.id}`,
                                            'Intermediate - Values': `/dashboard/program/single-program/${id}/values-itermediate/${e?.id}`,
                                            'Intermediate - Eight most common mistakes': `/dashboard/program/single-program/${id}/common-mistakes/${e?.id}`,
                                            'Intermediate - Questions for each goal - why?': `/dashboard/program/single-program/${id}/each-goal/${e?.id}`,
                                            'Intermediate - The Y Method': `/dashboard/program/single-program/${id}/y-method/${e?.id}`
                                        }
                                        if (e?.title == 'Upload Documents') {
                                            setuploadModal(true)
                                            setdocumentModuleId(e?.id)
                                        } else {
                                            navigate(data[e?.title])
                                        }
                                    })} src={pencil} />}

                                    
                                    { (e?.title != 'Goal Settings' && e?.title !='Habit Tracker') && <img onClick={(() => {
                                        const data = {
                                            'Values': `/dashboard/program/single-program/${id}/values/${e?.id}`,
                                            'Find your Motivation': `/dashboard/program/single-program/${id}/motivation/${e?.id}`,
                                            'Who am I': `/dashboard/program/single-program/${id}/who-Am-I/${e?.id}`,
                                            'Wheel of Life': `/dashboard/program/single-program/wheel-of-life/${id}/life-elements/${e?.id}`,
                                            'Card Game': `/dashboard/program/single-program/${id}/card-game/${e?.id}`,
                                            'Quote': `/dashboard/program/single-program/${id}/quote-categories/${e?.id}`,
                                            'Intermediate - Values': `/dashboard/program/single-program/${id}/values-itermediate/${e?.id}`,
                                            'Intermediate - Goal Settings': `/dashboard/program/single-program/${id}/goal-settings/${e?.id}`,
                                            'Intermediate - Eight most common mistakes': `/dashboard/program/single-program/${id}/common-mistakes/${e?.id}`,
                                            'Intermediate - Questions for each goal - why?': `/dashboard/program/single-program/${id}/each-goal/${e?.id}`,
                                            'Intermediate - The Y Method': `/dashboard/program/single-program/${id}/y-method/${e?.id}`
                                        }
                                        if (e?.title == 'Upload Documents') {
                                            setuploadModal(true)
                                            setdocumentModuleId(e?.id)
                                        } else {
                                            navigate(data[e?.title])
                                        }
                                    })} src={eye} />}
                                </div>
                                <img style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px'
                                }} />
                                <img src={icon1} />
                                <p style={{
                                    width: '100px',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
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
