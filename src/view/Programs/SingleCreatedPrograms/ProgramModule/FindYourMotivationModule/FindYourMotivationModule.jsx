import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import pencil from '../../../../../assets/Frame 1597882966.svg'
const FindYourMotivationModule = () => {
    const { id, moduleId } = useParams();
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [singleProgramData, setsingleProgramData] = useState([])
    const fetchSingleProgram = async () => {
        try {
            setloading(true)
            // const res = await getprogramById(id);
            // setsingleProgramData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchSingleProgram()
        }
    }, [id])
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Find your motivation</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}`))}>{singleProgramData?.name}</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}/card-game/${moduleId}`))}>Card Game</span> / <span onClick={(() => navigate(`/dashboard/programs/card-game/${id}/questions/${moduleId}`))}>Find your motivation</span></small>
                    </div>
                </div>
                <h3 style={{
                    marginTop: '20px',
                    color: 'var(--text-color)',
                    fontSize: '23px'
                }}>Values</h3>

                <div className='find_your_motivation_boxes_wrapper'>
                    <div className='motivation_box'>
                        <p>Attitude</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>

                    <div className='motivation_box'>
                        <p>Bold</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>

                    <div className='motivation_box'>
                        <p>Character</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>

                    <div className='motivation_box'>
                        <p>Discipline</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>

                    <div className='motivation_box'>
                        <p>Ego</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>

                    <div className='motivation_box'>
                        <p>Forgiveness</p>
                        <img src={pencil} style={{
                            position: 'absolute',
                            top: '5px',
                            right: '10px',
                            width: '25px'
                        }} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default FindYourMotivationModule
