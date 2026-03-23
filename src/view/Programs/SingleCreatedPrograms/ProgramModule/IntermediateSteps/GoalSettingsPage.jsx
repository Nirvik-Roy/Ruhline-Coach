import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../../Components/Button.jsx'
import crossIcon from '../../../../../assets/content (1).svg'
import CustomTextEditor from '../../../../../Components/CustomTextEditor/CustomTextEditor.jsx'
import Input from '../../../../../Components/Input.jsx'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
// import { getGoalSettings, postGoalSettings } from '../../../../../utils/Program'
import toast from 'react-hot-toast'
const GoalSettingsPage = () => {
    const navigate = useNavigate();
    const [description2, setdescription2] = useState("");
    const [goalSettingsData,setgoalSettingsData] = useState({})
    const [loading, setloading] = useState(false)
    const [goalData, setgoalData] = useState({
        headline: "",
        quote: "",
        sub_heading_1: "",
        sub_heading_2: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setgoalData({
            ...goalData,
            [name]: value
        })
    }
    const [optionsData, setoptionsData] = useState([
        {
            id: 0 + 1,
            description: ''
        }
    ])

    const handleOptions = (data, id) => {
        setoptionsData(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, description: data } : item
            )
        );
    }


    const addOptions = () => {
        setoptionsData([
            ...optionsData,
            {
                id: optionsData.length + 1,
                description: ""
            }
        ])
    }

    const deleteOptions = (id) => {
        if (optionsData.length != 1) {
            const dummyData = [...optionsData];
            const filteredData = dummyData.filter((e) => e.id != id);
            setoptionsData(filteredData)
        }
    }

    const handleSubmit = async () => {
        if(goalData?.headline != '' && goalData?.quote !='' && goalData?.sub_heading_1 && goalData?.sub_heading_2){
            try {
                setloading(true)
                const formData = new FormData()
                formData.append('headline', goalData.headline || "")
                formData.append('quote', goalData.quote || "")
                formData.append("sub_heading_1", goalData.sub_heading_1 || "")
                formData.append('sub_heading_2', goalData.sub_heading_2 || "")
                formData.append("description_2", description2 || "")
                if (optionsData?.length > 0) {
                    optionsData?.forEach((e, index) => {
                        formData.append(`options[${index}][description]`, e?.description || "")
                        formData.append(`options[${index}][sort_order]`, index)
                    })
                }
                // const res = await postGoalSettings(formData)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }else{
            toast.error("Plz enter all the required fileds")
        }
       
    }

    const fetchData = async () => {
        try {
            setloading(true);
            // const res = await getGoalSettings()
            // setgoalSettingsData(res?.data)
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
     setgoalData({
         headline: goalSettingsData?.headline || "",
         quote: goalSettingsData?.quote || "",
         sub_heading_1: goalSettingsData?.sub_heading_1 || "",
         sub_heading_2: goalSettingsData?.sub_heading_2 || ""
     })

        setdescription2(goalSettingsData?.description_2 || "")
        setoptionsData(goalSettingsData?.options || [{
            id:0+1,
            description:""
        }])
    },[goalSettingsData])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Goal Settings Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/goal-settings'))}>Goal Settings Intermediate Page</span></small>
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
                    <Input value={goalData.headline} name={'headline'} onChange={handleChange} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                </div>
                <div className='values_inputs_wrapper462'>
                    <Input value={goalData.quote} name={'quote'} onChange={handleChange} label={'Quote'} required={'true'} placeholder={'Enter quote'} />
                </div>

                <div className='values_inputs_wrapper462'>
                    <Input value={goalData.sub_heading_1} name={'sub_heading_1'} onChange={handleChange} label={'Sub Heading 1'} required={'true'} placeholder={'Enter sub heading 1'} />
                </div>



                <div className='cms_faq_wrapper'>
                    {optionsData?.length > 0 && optionsData?.map((e, i) => (
                        <div className='cms_faq_list'>
                            <p>Option {i + 1}</p>
                            <div className='cms_faq_questions_wrapper'>
                                <CustomTextEditor onChange={((data) => handleOptions(data, e?.id))} defaultValue={e?.description} label={'Description'} />
                            </div>
                            <img onClick={(() => deleteOptions(e?.id))} style={i != 0 ? { visibility: "visible" } : {
                                visibility: 'hidden'
                            }} src={crossIcon} />
                        </div>
                    ))}
                </div>


                <div onClick={addOptions}>
                    <Button children={'Add Options'} styles={{
                        color: 'var(--text-color)',
                        border: '1px solid var(--primary-color)',
                        padding: '12px 15px',
                        background: 'transparent',
                        fontSize: '13px'
                    }} />
                </div>

                <div className='values_inputs_wrapper462'>
                    <Input label={'Sub Heading 2'} value={goalData.sub_heading_2} name={'sub_heading_2'} onChange={handleChange} required={'true'} placeholder={'Enter sub heading 2'} />
                </div>


                <div className='values_inputs_wrapper462'>
                    <CustomTextEditor defaultValue={description2} onChange={((data) => setdescription2(data))} label={'Description 2'} />
                </div>
            </div>
        </>
    )
}

export default GoalSettingsPage
