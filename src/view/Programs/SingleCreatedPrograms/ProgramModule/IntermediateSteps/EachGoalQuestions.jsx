import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button'
import './IntermediateSteps.css'
import Input from '../../../Components/Input'
import crossIcon from '../../../assets/content.svg'
import Textarea from '../../../Components/Textarea'
import CustomTextEditor from '../../../Components/CustomTextEditor/CustomTextEditor'
import { useNavigate } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { getEachGoal, postEachGoal } from '../../../utils/Program'
import toast from 'react-hot-toast'
const EachGoalQuestions = () => {
    const navigate = useNavigate();
    const [eachGoalData, seteachGoalData] = useState({})
    const [questionHeading1, setquestionHeading1] = useState("")
    const [questionHeading2, setquestionHeading2] = useState("")
    const [questionHeading3, setquestionHeading3] = useState("")
    const [description1, setdescription1] = useState("")
    const [description2, setdescription2] = useState("")
    const [description3, setdescription3] = useState("")
    const [loading, setloading] = useState(false)
    const [staticData, setStaticData] = useState({
        headline_1: "",
        headline_2: "",
        headline_3: "",
        headline_4: "",
        headline_5: "",
        quote: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaticData({
            ...staticData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        if (staticData.headline_1 != '') {
            try {
                setloading(true);
                const formData = new FormData();
                formData.append("headline_1", staticData.headline_1 || "")
                formData.append("headline_2", staticData.headline_2 || "")
                formData.append("headline_3", staticData.headline_3 || "")
                formData.append("headline_4", staticData.headline_4 || "")
                formData.append("headline_5", staticData.headline_5 || "")
                formData.append("question_heading_1", questionHeading1 || "")
                formData.append('question_description_1', description1 || "")
                formData.append("question_heading_2", questionHeading2 || "")
                formData.append("question_description_2", description2 || "")
                formData.append("question_heading_3", questionHeading3 || "")
                formData.append("question_description_3", description3 || "");
                formData.append("quote", staticData.quote || "")
                const res = await postEachGoal(formData);
                console.log(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }else{
            toast.error("Plz enter the headline field...")
        }
       
    }

    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getEachGoal();
            seteachGoalData(res?.data)
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
        setStaticData({
            headline_1: eachGoalData?.headline_1 || "",
            headline_2: eachGoalData?.headline_2 || "",
            headline_3: eachGoalData?.headline_3 || "",
            headline_4: eachGoalData?.headline_4 || "",
            headline_5: eachGoalData?.headline_5 || "",
            quote: eachGoalData?.quote || "",
        })

        setquestionHeading1(eachGoalData?.question_heading_1 || ""),
            setdescription1(eachGoalData?.question_description_1 || "")
        setquestionHeading2(eachGoalData?.question_heading_2 || "")
        setdescription2(eachGoalData?.question_description_2 || "")
        setquestionHeading3(eachGoalData?.question_heading_3 || "")
        setdescription3(eachGoalData?.question_description_3 || "")

    }, [eachGoalData])

    console.log(eachGoalData)
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Questions for each goal - why? Intermediate Page</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate/each-goal'))}>Questions for each goal - why? Intermediate Page</span></small>
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
                    <div>

                        <Input onChange={handleChange} value={staticData.headline_1} name={'headline_1'} label={'Headline'} required={'true'} placeholder={'Enter headline'} />
                    </div>

                    {/* <div>
                        <CustomTextEditor label={'Description'} />
                    </div> */}

                    <div className='each_goal_grid_wrapper'>
                        <div>
                            <Input onChange={handleChange} value={staticData.headline_2} name={'headline_2'} label={'Headline 2'} placeholder={'Enter headline 2'} />
                        </div>

                        <div>
                            <Input onChange={handleChange} value={staticData.headline_3} name={'headline_3'} label={'Headline 3'} placeholder={'Enter Headline 3'} />
                        </div>

                        <div>
                            <Input onChange={handleChange} value={staticData.headline_4} name={'headline_4'} label={'Headline 4'} placeholder={'Enter Headline 4'} />
                        </div>
                    </div>

                    <div>
                        <Input onChange={handleChange} value={staticData.headline_5} name={'headline_5'} label={'Headline 5'} placeholder={'Enter Headline 5'} />
                    </div>
                </div>


                <div className='cms_faq_wrapper'>
                    <div className='cms_faq_list'>
                        <p>Question 1</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input value={questionHeading1} onChange={((e) => setquestionHeading1(e.target.value))} label={'Heading'} placeholder={'Enter question Heading'} />
                            <CustomTextEditor defaultValue={description1} onChange={((data) => setdescription1(data))} label={'Description'} />
                        </div>
                    </div>


                    <div className='cms_faq_list'>
                        <p>Question 2</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input value={questionHeading2} onChange={((e) => setquestionHeading2(e.target.value))} label={'Heading'} placeholder={'Enter question Heading'} />
                            <CustomTextEditor defaultValue={description2} onChange={((data) => setdescription2(data))} label={'Description'} />
                        </div>
                    </div>


                    <div className='cms_faq_list'>
                        <p>Question 3</p>
                        <div className='cms_faq_questions_wrapper'>
                            <Input value={questionHeading3} onChange={((e) => setquestionHeading3(e.target.value))} label={'Heading'} placeholder={'Enter question Heading'} />
                            <CustomTextEditor defaultValue={description3} onChange={((data) => setdescription3(data))} label={'Description'} />
                        </div>
                    </div>
                </div>

                <div className='values_inputs_wrapper462'>

                    <Input onChange={handleChange} value={staticData.quote} name={'quote'} label={'Quote'} placeholder={'Enter quote'} />
                </div>
            </div>
        </>
    )
}

export default EachGoalQuestions
