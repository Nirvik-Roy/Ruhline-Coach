import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import edit from '../../../../../assets/Pencil.svg'
import eye from '../../../../../assets/icon.svg'

const WhoamIModule = () => {
    const { id, moduleId } = useParams();
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [singleQuestionId, setsingleQuestionId] = useState('')
    const [editQuestionId, seteditQuestionId] = useState('')
    const [allQuestionSets, setallQuestionSets] = useState([]);
    const [singleQuestion, setsingleQuestion] = useState({})
    const [singleProgramData, setsingleProgramData] = useState([])
    const [editErrors, seteditErrors] = useState()
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
    const [tabs, setTabs] = useState({
        descriptive: false,
        multiChoice: false,
        singleChoice: false,
        dropdown: false,
        editdescriptive: false,
        editmultiChoice: false,
        editsingleChoice: false,
        editropdown: false
    })
    const tabsFunction = (i) => {
        setTabs({
            descriptive: i === 1 ? true : false,
            multiChoice: i === 2 ? true : false,
            singleChoice: i === 3 ? true : false,
            dropdown: i === 4 ? true : false,
            editdescriptive: i === 5 ? true : false,
            editmultiChoice: i === 6 ? true : false,
            editsingleChoice: i === 7 ? true : false,
            editropdown: i === 8 ? true : false
        })
    }
    const addSingleQuestion = (id, questionId) => {
        const filteredData = allQuestionSets?.filter((e) => e.id == id)
        const questionsFiltered = filteredData[0].questions?.filter((e) => e.id == questionId)
        setsingleQuestion(...questionsFiltered)
    }
    const editQuestionText = (e) => {
        const { name, value } = e.target;
        setsingleQuestion({
            ...singleQuestion,
            [name]: value
        })
    }
    const editAddEmptyOption = () => {
        setsingleQuestion(prev => ({
            ...prev,
            options: [...(prev.options || []), '']
        }));
    };

    const editdeleteOption = (indexToDelete) => {
        setsingleQuestion(prev => ({
            ...prev,
            options: prev.options.filter((_, index) => index !== indexToDelete)
        }));
    };

    const editOptionValue = (indexToUpdate, newValue) => {
        setsingleQuestion(prev => ({
            ...prev,
            options: prev.options.map((opt, idx) =>
                idx === indexToUpdate ? newValue : opt
            )
        }));
    };

    const editQuestions = async () => {
        if (id && editQuestionId && singleQuestionId) {
            try {
                setloading(true);
                const formData = new FormData()
                formData.append(`type`, singleQuestion.type)
                formData.append('question_text', singleQuestion.question_text)
                if (singleQuestion.options?.length > 0) {
                    singleQuestion.options?.forEach(option => {
                        formData.append('options[]', option);
                    });
                } else {
                    formData.append('options', [])
                }
                // const res = await editQuestionsInsideQuestionSet(formData, moduleId, id, singleQuestionId, editQuestionId);
                // if (res?.success) {
                //     setTabs(0);
                //     getQuestionSets()
                //     seteditQuestionId('')
                //     setsingleQuestionId('')
                //     seteditErrors('')
                // } else {
                //     seteditErrors(res)
                // }

            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }
    return (
        <>
            {tabs.editmultiChoice && <EditMultiChoiceModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editropdown && <EditDropdownModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editsingleChoice && <EditSingleChoiceModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editdescriptive && <EditDescriptiveModal editQuestions={editQuestions} editErrors={editErrors} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Who am I</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}`))}>{singleProgramData?.name}</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}/card-game/${moduleId}`))}>Card Game</span> / <span onClick={(() => navigate(`/dashboard/programs/card-game/${id}/questions/${moduleId}`))}>Who am I</span></small>
                    </div>
                </div>
                <div className='questions_list_wrapper4562'>
                    {[1, 2, 3]?.map((element, index) => {
                        return (
                            <>
                                <div key={index} className='added_modules_wrapper '>
                                    <div className='add_modules_enu_wrapper'>
                                        <p>{element?.question_text || 'Question 1'} <small style={{
                                            fontSize: '10px',
                                            marginLeft: '5px'
                                        }}>{element?.type || 'Single Choice'}</small></p>
                                    </div>
                                    <div className='edit_modules_wrapper' style={{
                                        display:'flex',
                                        alignItems:'center',
                                        gap:'10px'
                                    }}>
                                        <img onClick={(() => {
                                            seteditQuestionId()
                                            setsingleQuestionId(element?.id)
                                            addSingleQuestion('dummy Id', element?.id)
                                            if (element?.type === 'descriptive') {
                                                tabsFunction(5)
                                            }
                                            if (element?.type == 'multi_choice') {
                                                tabsFunction(6)
                                            }
                                            if (element?.type === 'single_choice') {
                                                tabsFunction(7)
                                            }

                                            if (element?.type === 'dropdown') {
                                                tabsFunction(8)
                                            }
                                        })} src={edit} />

                                        <img style={{
                                            width:'20px'
                                        }} src={eye}/>

                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default WhoamIModule
