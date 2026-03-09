import React, { useEffect, useState } from 'react'
import './CardGameModule.css'
import Button from '../../../../../Components/Button.jsx'
import menu from '../../../../../assets/menu.svg'
import edit from '../../../../../assets/Pencil.svg'
import deleteicon from '../../../../../assets/delete.svg'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import CardGameDescriptiveModal from '../../../../Modal/CardGameDescriptiveModal.jsx'
import CardGameMultichoiceModal from '../../../../Modal/CardGameMultichoiceModal'
import CardGameSingleChoiceModal from '../../../../Modal/CardGameSingleChoiceModal'
import CardGameDropdownModal from '../../../../Modal/CardGameDropdownModal'
import EditMultiChoiceModal from '../../../../Modal/EditMultiChoiceModal.jsx'
import EditDropdownModal from '../../../../Modal/EditDropdownModal'
import EditSingleChoiceModal from '../../../../Modal/EditSingleChoiceModal'
import EditDescriptiveModal from '../../../../Modal/EditDescriptiveModal'
import EditQuestionTitleModal from '../../../../Modal/EditQuestionTitleModal'
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx'
import toast from 'react-hot-toast'
const CardGameQuestions = () => {
    const navigate = useNavigate();
    const [allQuestionSets, setallQuestionSets] = useState([]);
    const [singleQuestion, setsingleQuestion] = useState({})
    const [selectedIndex, setselectedIndex] = useState(null);
    const [questionId, setquestionId] = useState()
    const [errors, setErrors] = useState()
    const [editErrors, seteditErrors] = useState()
    const [deleteId, setdeleteId] = useState('')
    const [deleteModal, setdeleteModal] = useState(false);
    const [singleQuestionId, setsingleQuestionId] = useState('')
    const [editQuestionId, seteditQuestionId] = useState('')
    const [dynamicOptions, setdynamicOptions] = useState(
        [
            {
                id: 1,
                title: 'Question 1',
                questions: [
                    {
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                ]
            },
            {
                id: 2,
                title: 'Question 1',
                questions: [
                    {
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                ]
            },

            {
                id: 3,
                title: 'Question 1',
                questions: [
                    {
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                ]
            },
            {
                id: 4,
                title: 'Question 1',
                questions: [
                    {
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                ]
            },
            {
                id: 5,
                title: 'Question 1',
                questions: [
                    {
                        id: 1,
                        type: 'descriptive',
                        question_text: '',
                        options: null,
                    }, {
                        id: 2,
                        type: 'multi_choice',
                        question_text: '',
                        options: []
                    }, {
                        id: 3,
                        type: 'single_choice',
                        question_text: '',
                        options: []
                    },
                    {
                        id: 4,
                        type: 'dropdown',
                        question_text: '',
                        options: []
                    }
                ]
            }
        ])
    const [loading, setloading] = useState(false);
    const { id, moduleId } = useParams();
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

    const getQuestionSets = async () => {
        try {
            setloading(true)
            //  const res = await getCardGameQuestionSets(id, moduleId)
            // if (res?.success) {
            //     setallQuestionSets(res?.data?.data)
            // }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }



    useEffect(() => {
        if (id && moduleId) {
            getQuestionSets()
        }
    }, [id, moduleId])

    const updateQuestionText = (sectionIndex, questionIndex, newText) => {
        setdynamicOptions(prevOptions => {
            const updatedOptions = [...prevOptions];
            updatedOptions[sectionIndex].questions[questionIndex].question_text = newText;
            return updatedOptions;
        });
    }
    const addEmptyOption = (sectionIndex, questionIndex) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];

            // Initialize options array if it doesn't exist
            if (!question.options) {
                question.options = [];
            }

            // Add new option (as string or object based on your needs)
            question.options.push(''); // If options are strings
            // OR if options should be objects:
            // question.options.push({ id: Date.now(), text: '', value: '' });

            return updated;
        });
    };
    const updateOptionText = (sectionIndex, questionIndex, optionIndex, value) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];

            question.options[optionIndex] = value;


            return updated;
        });
    };

    const removeOption = (sectionIndex, questionIndex, optionIndex) => {
        setdynamicOptions(prev => {
            const updated = [...prev];
            const question = updated[sectionIndex].questions[questionIndex];
            question.options = question.options.filter((_, idx) => idx !== optionIndex);
            return updated;
        });
    };


    const postQuestions = async () => {
        if (id) {
            try {
                setloading(true);
                const formData = new FormData()
                dynamicOptions[selectedIndex]?.questions.forEach((element) => {
                    if (element.type && element.question_text) {
                        formData.append(`type`, element.type)
                        formData.append('question_text', element.question_text)
                        if (element.options?.length > 0) {
                            element.options?.forEach(option => {
                                formData.append('options[]', option);
                            });
                        } else {
                            formData.append('options', [])
                        }
                    }
                })
                // const res = await postQuestionsInsideQuestionSet(formData, moduleId, id, questionId);
                // if (res?.success) {
                //     setTabs(0);
                //     getQuestionSets()
                //     setselectedIndex('')
                //     setquestionId('')
                //     setdynamicOptions([
                //         {
                //             id: 1,
                //             title: 'Question 1',
                //             questions: [
                //                 {
                //                     id: 1,
                //                     type: 'descriptive',
                //                     question_text: '',
                //                     options: null,
                //                 }, {
                //                     id: 2,
                //                     type: 'multi_choice',
                //                     question_text: '',
                //                     options: []
                //                 }, {
                //                     id: 3,
                //                     type: 'single_choice',
                //                     question_text: '',
                //                     options: []
                //                 },
                //                 {
                //                     id: 4,
                //                     type: 'dropdown',
                //                     question_text: '',
                //                     options: []
                //                 }
                //             ]
                //         },
                //         {
                //             id: 2,
                //             title: 'Question 1',
                //             questions: [
                //                 {
                //                     id: 1,
                //                     type: 'descriptive',
                //                     question_text: '',
                //                     options: null,
                //                 }, {
                //                     id: 2,
                //                     type: 'multi_choice',
                //                     question_text: '',
                //                     options: []
                //                 }, {
                //                     id: 3,
                //                     type: 'single_choice',
                //                     question_text: '',
                //                     options: []
                //                 },
                //                 {
                //                     id: 4,
                //                     type: 'dropdown',
                //                     question_text: '',
                //                     options: []
                //                 }
                //             ]
                //         },

                //         {
                //             id: 3,
                //             title: 'Question 1',
                //             questions: [
                //                 {
                //                     id: 1,
                //                     type: 'descriptive',
                //                     question_text: '',
                //                     options: null,
                //                 }, {
                //                     id: 2,
                //                     type: 'multi_choice',
                //                     question_text: '',
                //                     options: []
                //                 }, {
                //                     id: 3,
                //                     type: 'single_choice',
                //                     question_text: '',
                //                     options: []
                //                 },
                //                 {
                //                     id: 4,
                //                     type: 'dropdown',
                //                     question_text: '',
                //                     options: []
                //                 }
                //             ]
                //         },
                //         {
                //             id: 4,
                //             title: 'Question 1',
                //             questions: [
                //                 {
                //                     id: 1,
                //                     type: 'descriptive',
                //                     question_text: '',
                //                     options: null,
                //                 }, {
                //                     id: 2,
                //                     type: 'multi_choice',
                //                     question_text: '',
                //                     options: []
                //                 }, {
                //                     id: 3,
                //                     type: 'single_choice',
                //                     question_text: '',
                //                     options: []
                //                 },
                //                 {
                //                     id: 4,
                //                     type: 'dropdown',
                //                     question_text: '',
                //                     options: []
                //                 }
                //             ]
                //         },
                //         {
                //             id: 5,
                //             title: 'Question 1',
                //             questions: [
                //                 {
                //                     id: 1,
                //                     type: 'descriptive',
                //                     question_text: '',
                //                     options: null,
                //                 }, {
                //                     id: 2,
                //                     type: 'multi_choice',
                //                     question_text: '',
                //                     options: []
                //                 }, {
                //                     id: 3,
                //                     type: 'single_choice',
                //                     question_text: '',
                //                     options: []
                //                 },
                //                 {
                //                     id: 4,
                //                     type: 'dropdown',
                //                     question_text: '',
                //                     options: []
                //                 }
                //             ]
                //         }
                //     ])
                //     setErrors('')
                // } else {
                //     setErrors(res)
                //     console.log('error')
                // }

            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }

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

    useEffect(() => {
        if (!tabs.descriptive && !tabs.dropdown && !tabs.editdescriptive && !tabs.editmultiChoice && !tabs.editropdown && !tabs.editsingleChoice && !tabs.multiChoice && !tabs.singleChoice) {
            setErrors('')
            seteditErrors('')
            setdynamicOptions([
                {
                    id: 1,
                    title: 'Question 1',
                    questions: [
                        {
                            id: 1,
                            type: 'descriptive',
                            question_text: '',
                            options: null,
                        }, {
                            id: 2,
                            type: 'multi_choice',
                            question_text: '',
                            options: []
                        }, {
                            id: 3,
                            type: 'single_choice',
                            question_text: '',
                            options: []
                        },
                        {
                            id: 4,
                            type: 'dropdown',
                            question_text: '',
                            options: []
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Question 1',
                    questions: [
                        {
                            id: 1,
                            type: 'descriptive',
                            question_text: '',
                            options: null,
                        }, {
                            id: 2,
                            type: 'multi_choice',
                            question_text: '',
                            options: []
                        }, {
                            id: 3,
                            type: 'single_choice',
                            question_text: '',
                            options: []
                        },
                        {
                            id: 4,
                            type: 'dropdown',
                            question_text: '',
                            options: []
                        }
                    ]
                },

                {
                    id: 3,
                    title: 'Question 1',
                    questions: [
                        {
                            id: 1,
                            type: 'descriptive',
                            question_text: '',
                            options: null,
                        }, {
                            id: 2,
                            type: 'multi_choice',
                            question_text: '',
                            options: []
                        }, {
                            id: 3,
                            type: 'single_choice',
                            question_text: '',
                            options: []
                        },
                        {
                            id: 4,
                            type: 'dropdown',
                            question_text: '',
                            options: []
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'Question 1',
                    questions: [
                        {
                            id: 1,
                            type: 'descriptive',
                            question_text: '',
                            options: null,
                        }, {
                            id: 2,
                            type: 'multi_choice',
                            question_text: '',
                            options: []
                        }, {
                            id: 3,
                            type: 'single_choice',
                            question_text: '',
                            options: []
                        },
                        {
                            id: 4,
                            type: 'dropdown',
                            question_text: '',
                            options: []
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Question 1',
                    questions: [
                        {
                            id: 1,
                            type: 'descriptive',
                            question_text: '',
                            options: null,
                        }, {
                            id: 2,
                            type: 'multi_choice',
                            question_text: '',
                            options: []
                        }, {
                            id: 3,
                            type: 'single_choice',
                            question_text: '',
                            options: []
                        },
                        {
                            id: 4,
                            type: 'dropdown',
                            question_text: '',
                            options: []
                        }
                    ]
                }
            ])
        }
    }, [tabs.descriptive, tabs.dropdown, tabs.editdescriptive, tabs.editmultiChoice, tabs.editropdown, tabs.editsingleChoice, tabs.singleChoice, tabs.multiChoice])
    const [editTitletModal, seteditTitleModal] = useState(false);
    const [singleSet, setsingleSet] = useState({})
    const editQuestionSet = async (data) => { 
        if (data) {
            try {
                setloading(true)
                //  const res = await editCardGameQuestionSet({
                //     title: data
                // }, moduleId, id, questionId)

                // if (res?.success) {
                //     seteditTitleModal(false)
                //     getQuestionSets()
                // }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field...')
        }

    }

    const singleQuestionSet = (id) => {
        setsingleSet(allQuestionSets?.filter((e) => e?.id == id))
    }

    const handleDelete = (id, questionId) => {
        setdeleteId(id)
        setdeleteModal(true)
        setquestionId(questionId)
    }

    const deleteFunc = async () => {
        try {
            setloading(true)
            // const res = await deleteQuestionsInsideSet(moduleId, id, deleteId, questionId)
            // console.log(res)
            // if (res?.success) {
            //     setdeleteModal(false)
            //     getQuestionSets()
            // }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

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
            {loading && <Loaders />}
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} onClick={deleteFunc} title={'Delete question?'} details={'Do you really want to delete this question?'} />}
         
            {tabs.editmultiChoice && <EditMultiChoiceModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editropdown && <EditDropdownModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editsingleChoice && <EditSingleChoiceModal editQuestions={editQuestions} editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editdescriptive && <EditDescriptiveModal editQuestions={editQuestions} editErrors={editErrors} singleData={singleQuestion} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.descriptive && <CardGameDescriptiveModal errors={errors} postQuestions={postQuestions} selectedIndex={selectedIndex} updateQuestionText={updateQuestionText} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}

            {tabs.multiChoice && <CardGameMultichoiceModal errors={errors} postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}

            {tabs.singleChoice && <CardGameSingleChoiceModal errors={errors} postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}

            {tabs.dropdown && <CardGameDropdownModal errors={errors} postQuestions={postQuestions} updateOptionText={updateOptionText} dynamicOptions={dynamicOptions} updateQuestionText={updateQuestionText} addEmptyOption={addEmptyOption} removeOption={removeOption} selectedIndex={selectedIndex} tabsFunction={tabsFunction} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Questions</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}`))}>{singleProgramData?.name}</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}/card-game/${moduleId}`))}>Card Game</span> / <span onClick={(() => navigate(`/dashboard/programs/card-game/${id}/questions/${moduleId}`))}>Questions</span></small>
                    </div>
                </div>

                <div className='card_game_questions_list_wrapper'>
                    {[1,2,3,4,5]?.map((e, i) => (
                        <>

                            <div className='card_game_questions_wrapper' key={e?.id}>
                                <div className='question_set_heading'>
                                    <h2>{e?.title || `Question ${i+1}`}</h2>
                                    <hr />
                                </div>
                               
                                <div className='questions_list_wrapper4562'>
                                    {e?.questions?.length <= 0 && <p style={{
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        marginTop: '-10px',
                                        color: 'var(--primary-color)'
                                    }}>No questions added...</p>}
                                    {e?.questions?.map((element,index) => {
                                        return (
                                            <>
                                                <div key={index} className='added_modules_wrapper'>
                                                    <div className='add_modules_enu_wrapper'>
                                                        <img src={menu} />
                                                        <p>{element?.question_text} <small style={{
                                                            fontSize: '10px',
                                                            marginLeft: '5px'
                                                        }}>{element?.type}</small></p>
                                                    </div>
                                                    <div className='edit_modules_wrapper'>
                                                        <img onClick={(() => {
                                                            seteditQuestionId(e?.id)
                                                            setsingleQuestionId(element?.id)
                                                            addSingleQuestion(e?.id, element?.id)
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
                                                        <img onClick={(() => {
                                                            handleDelete(element?.id, e?.id)
                                                        })} src={deleteicon} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

                                </div>
                            </div>

                        </>
                    ))}

                </div>
            </div>
        </>
    )
}

export default CardGameQuestions
