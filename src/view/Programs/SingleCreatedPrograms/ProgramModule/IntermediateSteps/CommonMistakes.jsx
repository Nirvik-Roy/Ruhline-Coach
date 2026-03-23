import React, { use, useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import { useNavigate } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { getCommonMistakes, postCommonMistakes } from '../../../utils/Program'
import toast from 'react-hot-toast'
const CommonMistakes = () => {
    const navigate = useNavigate();
    const [allMistakesData, setallMistakesData] = useState({})
    const [headline, setheadline] = useState("");
    const [loading, setloading] = useState(false)
    const [mistakesData, setmistakesData] = useState([
        {
            id: 0 + 1,
            description: ''
        }
    ])

    const handleMistakes = (data, id) => {
        setmistakesData(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }

    const addMistakes = () => {
        setmistakesData([
            ...mistakesData,
            {
                id: mistakesData.length + 1,
                description: ""
            }
        ])
    }

    const deleteOptions = (id) => {
        if (mistakesData.length != 1) {
            const dummyData = [...mistakesData];
            const filteredData = dummyData.filter((e) => e.id != id);
            setmistakesData(filteredData)
        }
    }

    const handleSubmit = async () => {
        if (headline != '') {
            try {
                setloading(true);
                const formData = new FormData();
                formData.append('headline', headline || "")
                if (mistakesData.length > 0) {
                    mistakesData.forEach((e, index) => {
                        formData.append(`mistakes[${index}][description]`, e?.description || "")
                        formData.append(`mistakes[${index}][sort_order] `, index)
                    })
                }
                const res = await postCommonMistakes(formData)
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
            const res = await getCommonMistakes()
            setallMistakesData(res?.data)
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
        setheadline(allMistakesData?.headline || "")
        setmistakesData(allMistakesData?.mistakes || [
            {
                id: 0 + 1,
                description: ""
            }
        ])
    }, [allMistakesData])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Eight most common mistakes Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/common-mistakes'))}>Eight most common mistakes Intermediate Page</span></small>
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
                    <Input value={headline} onChange={((e) => setheadline(e.target.value))} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                </div>


                <div className='cms_faq_wrapper'>
                    {mistakesData?.length > 0 && mistakesData?.map((e, i) => (
                        <div className='cms_faq_list'>
                            <p>Mistake {i + 1}</p>
                            <div className='cms_faq_questions_wrapper'>
                                <CustomTextEditor defaultValue={e?.description} onChange={((data) => handleMistakes(data, e?.id))} label={'Description'} />
                            </div>
                            <img onClick={(() => deleteOptions(e?.id))} style={i != 0 ? {
                                visibility: 'visible'
                            } : {
                                visibility: 'hidden'
                            }} src={crossIcon} />
                        </div>
                    ))}

                </div>


                <div onClick={addMistakes}>
                    <Button children={'Add Mistake'} styles={{
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

export default CommonMistakes
