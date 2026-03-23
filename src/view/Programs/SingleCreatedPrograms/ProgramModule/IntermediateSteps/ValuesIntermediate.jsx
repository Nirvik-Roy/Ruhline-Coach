import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import { useNavigate } from 'react-router-dom'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import toast from 'react-hot-toast'
import Loaders from '../../../Components/Loaders/Loaders'
import { getValuesIntermediate, postValuesIntermediate } from '../../../utils/Program'
const ValuesIntermediate = () => {
    const navigate = useNavigate()
    const [headline, setheadLine] = useState('');
    const [valuesData, setvaluesData] = useState({})
    const [loading, setloading] = useState(false)
    const [pointsData, setpointsData] = useState([
        {
            id: 0 + 1,
            description: "",
        }
    ])
    const handlePoints = (data, id) => {
        setpointsData(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }

    const addPoints = () => {
        setpointsData([
            ...pointsData,
            {
                id: pointsData.length + 1,
                description: ""
            }
        ])
    }

    const deletePoints = (id) => {
        if (pointsData.length != 1) {
            const dummyData = [...pointsData];
            const filteredData = dummyData.filter((e) => e.id != id);
            setpointsData(filteredData)
        }
    }

    const handleSubmit = async () => {
        if (headline != '') {
            try {
                setloading(true);
                const formData = new FormData();
                formData.append('headline', headline || "")
                if (pointsData.length > 0) {
                    pointsData.forEach((e, index) => {
                        formData.append(`points[${index}][description]`, e?.description || "")
                        formData.append(`points[${index}][sort_order] `, index)
                    })
                }
                const res = await postValuesIntermediate(formData)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the headline field')
        }
    }


    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getValuesIntermediate()
            setvaluesData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        setheadLine(valuesData?.headline || "")
        setpointsData(valuesData?.points || [
            {
                id: 0 + 1,
                description: ""
            }
        ])
    }, [valuesData])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Values Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/values-intermediate'))}>Values Intermediate Page</span></small>
                    </div>
                    <div className='coaches_button_wapper'>

                        {/* <div>
                            <Button children={'Cancel'} styles={{
                                fontSize: '13px',
                                color: 'var(--text-color)',
                                background: 'transparent',
                                border: 'none'
                            }} />
                        </div> */}
                        <div onClick={handleSubmit}>
                            <Button children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='values_inputs_wrapper462'>
                    <Input onChange={((e) => setheadLine(e.target.value))} value={headline} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                </div>


                <div className='cms_faq_wrapper'>
                    {pointsData?.length > 0 && pointsData?.map((e, i) => (
                        <div className='cms_faq_list'>
                            <p>Point {i + 1}</p>
                            <div className='cms_faq_questions_wrapper'>
                                <CustomTextEditor defaultValue={e?.description} onChange={((data) => handlePoints(data, e?.id))} label={'Description'} />
                            </div>
                            <img onClick={(() => deletePoints(e?.id))} style={i != 0 ? { visibility: 'visible' } : {
                                visibility: 'hidden'
                            }} src={crossIcon} />
                        </div>
                    ))}

                </div>


                <div onClick={addPoints}>
                    <Button children={'Add Point'} styles={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--primary-color)',
                        padding: '12px 15px',
                        background: 'transparent',
                        fontSize: '13px'
                    }} />
                </div>
            </div>
        </>
    )
}

export default ValuesIntermediate
