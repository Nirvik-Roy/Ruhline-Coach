import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import { useNavigate } from 'react-router-dom'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import toast from 'react-hot-toast'
import { getYMethod, postYMethod } from '../../../utils/Program'
import Loaders from '../../../Components/Loaders/Loaders'

const TheYMethod = () => {
    const navigate = useNavigate();
    const [headline, setheadLine] = useState('');
    const [ymethodData,setymethodData] = useState({})
    const [loading, setloading] = useState(false)
    const [stepOptions, setstepOptions] = useState([
        {
            id: 0 + 1,
            description: "",
        }
    ])

    const handleSteps = (data, id) => {
        setstepOptions(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }

    const addSteps = () => {
        setstepOptions([
            ...stepOptions,
            {
                id: stepOptions.length + 1,
                description: ""
            }
        ])
    }

    const deleteSteps = (id) => {
        if (stepOptions.length != 1) {
            const dummyData = [...stepOptions];
            const filteredData = dummyData.filter((e) => e.id != id);
            setstepOptions(filteredData)
        }
    }

    const handleSubmit = async () => {
        if (headline) {
            try {
                setloading(true)
                const formData = new FormData();
                formData.append('headline', headline)
                if (stepOptions?.length > 0) {
                    stepOptions?.forEach((e, index) => {
                        formData.append(`steps[${index}][description]`, e?.description || "")
                        formData.append(`steps[${index}][sort_order]`, index)
                    })
                }
                const res = await postYMethod(formData);
                console.log(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }

        } else {
            toast.error("Plz enter the headline")
        }
    }

    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getYMethod();
            setymethodData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(()=>{
      setheadLine(ymethodData?.headline || "")
        setstepOptions(ymethodData?.steps || {
            id:0+1,
            title:"",
            description:""
        })
    },[ymethodData])

    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>The Y Method Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/y-method'))}>The Y Method Page</span></small>
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
                        <div>
                            <Button onClick={handleSubmit} children={'Save'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='values_inputs_wrapper462'>
                    <Input value={headline} onChange={((e) => setheadLine(e.target.value))} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                </div>


                <div className='cms_faq_wrapper'>
                    {stepOptions?.length > 0 && stepOptions?.map((e, i) => {
                        return (
                            <div key={e?.id} className='cms_faq_list'>
                                <p>Step {i + 1}</p>
                                <div className='cms_faq_questions_wrapper'>
                                    <CustomTextEditor name={'description'} defaultValue={e?.description} label={'Description'} onChange={((data) => handleSteps(data, e?.id))} />
                                </div>
                                {<img onClick={(() => deleteSteps(e?.id))} style={i != 0 ? {
                                    visibility: 'visible'
                                } : { visibility: "hidden" }} src={crossIcon} />}
                            </div>
                        )
                    })}
                </div>


                <div onClick={addSteps}>
                    <Button children={'Add step'} styles={{
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

export default TheYMethod
