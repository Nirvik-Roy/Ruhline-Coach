import React, { useEffect, useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import menu from '../../../../../assets/menu.svg'
import edit from '../../../../../assets/Pencil.svg'
import deleteicon from '../../../../../assets/delete.svg'
import DescriptiveModal from '../../../../Modal/DescriptiveModal.jsx'
import MultiChoiceModal from '../../../../Modal/MultiChoiceModal.jsx'
import SingleChoiceModal from '../../../../Modal/SingleChoiceModal.jsx'
import DropdownModal from '../../../../Modal/DropdownModal.jsx'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteWheelofLifeQuestion, editWheelofLifeQuestion, getprogramById, getwheelofLifeElements, getWheelOfLifeQuestions, postWheelofLifeQuestion } from '../../../../../utils/Program.js'
import EditMultiChoiceModal from '../../../../Modal/EditMultiChoiceModal.jsx'
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx'
import EditDropdownModal from '../../../../Modal/EditDropdownModal.jsx'
import EditSingleChoiceModal from '../../../../Modal/EditSingleChoiceModal.jsx'
import EditDescriptiveModal from '../../../../Modal/EditDescriptiveModal.jsx'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
const SinglelifeElement = () => {
    const [errors, setErrors] = useState()
    const [editErrors, seteditErrors] = useState()
    const [deleteId, setdeleteId] = useState('')
    const [deleteModal, setdeleteModal] = useState(false)
    const [singleData, setsingleData] = useState();
    const [allQuestions, setallQuestions] = useState([]);
    const [dynamicOptions, setdynamicOptions] = useState([
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
    ])
    const { id, moduleId, elementId } = useParams();
    const navigate = useNavigate()
    const [lifeElements, setlifelements] = useState([]);
    const [finalLifeElements, setfinallifeElement] = useState()
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

    const [singleProgramData, setsingleProgramData] = useState([])
    const [loading, setloading] = useState(false);

    const fetchSingleProgram = async () => {
        try {
            setloading(true)
            const res = await getprogramById(id);
            setsingleProgramData(res?.data)
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
    }, [])

    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getwheelofLifeElements(id, moduleId);
            console.log(res)
            setlifelements(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id && moduleId) {
            fetchData()
        }
    }, [id, moduleId])

    useEffect(() => {
        const dummyData = [...lifeElements]
        const filteredData = dummyData.filter((e) => e?.id == elementId)
        setfinallifeElement(filteredData)

    }, [id, elementId, lifeElements])

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

    const fetchAllQuestions = async () => {
        try {
            setloading(true)
            const res = await getWheelOfLifeQuestions(id, moduleId, elementId)
            console.log(res)
            if (res?.success) {
                setallQuestions(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id && moduleId) {
            fetchAllQuestions()
        }
    }, [id, moduleId])
    const addEmptyOption = (questionIndex) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: [...item.options, '']
                    }
                    : item
            )
        );
    };


    const editAddEmptyOption = () => {
        setsingleData(prev => ({
            ...prev,
            options: [...(prev.options || []), '']
        }));
    };

    const editdeleteOption = (indexToDelete) => {
        setsingleData(prev => ({
            ...prev,
            options: prev.options.filter((_, index) => index !== indexToDelete)
        }));
    };

    const editOptionValue = (indexToUpdate, newValue) => {
        setsingleData(prev => ({
            ...prev,
            options: prev.options.map((opt, idx) =>
                idx === indexToUpdate ? newValue : opt
            )
        }));
    };
    const removeOption = (questionIndex, optionIndex) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: item.options.filter((_, oIndex) => oIndex !== optionIndex)
                    }
                    : item
            )
        );
    };

    const editQuestionText = (e) => {
        const { name, value } = e.target;
        setsingleData({
            ...singleData,
            [name]: value
        })
    }

    const updateQuestionText = (questionIndex, text) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? { ...item, question_text: text }
                    : item
            )
        );
    };

    const updateOptionText = (questionIndex, optionIndex, newValue) => {
        setdynamicOptions(prev =>
            prev.map((item, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...item,
                        options: item.options.map((opt, oIndex) =>
                            oIndex === optionIndex ? newValue : opt
                        )
                    }
                    : item
            )
        );
    };
    useEffect(() => {
        if (!tabs.descriptive && !tabs.dropdown && !tabs.editdescriptive && !tabs.editmultiChoice && !tabs.editropdown && !tabs.editsingleChoice && !tabs.multiChoice && !tabs.singleChoice) {
            setErrors('')
            seteditErrors('')
            setdynamicOptions([
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
            ])
        }
    }, [tabs.descriptive, tabs.dropdown, tabs.editdescriptive, tabs.editmultiChoice, tabs.editropdown, tabs.editsingleChoice, tabs.singleChoice, tabs.multiChoice])

    const getSingleData = (index) => {
        setsingleData(allQuestions[index])
    }

    const handleChange = (id) => {
        setdeleteId(id)
        setdeleteModal(true)
    }

    const postQuestions = async () => {
        if (id) {
            try {
                setloading(true);
                const formData = new FormData()
                dynamicOptions.forEach((element) => {
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
                const res = await postWheelofLifeQuestion(formData, moduleId, id, elementId);
                if (res?.success) {
                    setTabs(0);
                    fetchAllQuestions()

                    setdynamicOptions([
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
                    ])
                }
                setErrors(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }

    const editQuestions = async (questionId) => {
        if (id && questionId) {
            try {
                setloading(true);
                const formData = new FormData()
                formData.append(`type`, singleData.type)
                formData.append('question_text', singleData.question_text)
                if (singleData.options?.length > 0) {
                    singleData.options?.forEach(option => {
                        formData.append('options[]', option);
                    });
                } else {
                    formData.append('options', [])
                }
                const res = await editWheelofLifeQuestion(formData, moduleId, id, questionId, elementId);
                if (res?.success) {
                    setTabs(0);
                    fetchAllQuestions()

                }
                seteditErrors(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }
    const deleteQuestions = async () => {
        if (deleteId) {
            try {
                setloading(true)
                const res = await deleteWheelofLifeQuestion(moduleId, id, deleteId, elementId);
                if (res?.success) {
                    setdeleteModal(false)
                    fetchAllQuestions()
                    setTabs(0)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Reuired data not found!')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            {deleteModal && <DeleteModal onClick={deleteQuestions} title={'Delete Questions'} details={'Do you really want to delete this question?'} setdeleteModal={setdeleteModal} />}
            {tabs.descriptive && <DescriptiveModal errors={errors} updateQuestionText={updateQuestionText} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}
            {tabs.multiChoice && <MultiChoiceModal errors={errors} updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}

            {tabs.singleChoice && <SingleChoiceModal errors={errors} updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}

            {tabs.dropdown && <DropdownModal errors={errors} updateOptionText={updateOptionText} updateQuestionText={updateQuestionText} removeOption={removeOption} addEmptyOption={addEmptyOption} postQuestions={postQuestions} dynamicOptions={dynamicOptions} setdynamicOptions={setdynamicOptions} tabsFunction={tabsFunction} />}


            {tabs.editmultiChoice && <EditMultiChoiceModal editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleData} editQuestions={editQuestions} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editropdown && <EditDropdownModal editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleData} editQuestions={editQuestions} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editsingleChoice && <EditSingleChoiceModal editErrors={editErrors} editdeleteOption={editdeleteOption} editAddEmptyOption={editAddEmptyOption} editOptionValue={editOptionValue} singleData={singleData} editQuestions={editQuestions} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}

            {tabs.editdescriptive && <EditDescriptiveModal editErrors={editErrors} singleData={singleData} editQuestions={editQuestions} tabsFunction={tabsFunction} editQuestionText={editQuestionText} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>{finalLifeElements?.length > 0 && finalLifeElements[0]?.name}</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}`))}>{singleProgramData?.name}</span>  / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}/wheeloflife/${moduleId}`))}>Wheel of Life</span> / <span onClick={(() => navigate(`/dashboard/programs/single-program/${id}/life-element/${moduleId}/${finalLifeElements?.length > 0 && finalLifeElements[0]?.id}`))}>{finalLifeElements?.length > 0 && finalLifeElements[0]?.name}</span></small>
                    </div>
                </div>
                <div className='questions_wrapper'>
                    <h3>Questions</h3>
                    <div className='questions_tabs_wrapper'>
                        <div onClick={(() => tabsFunction(1))}>

                            <Button children={'Descriptive'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>

                        <div onClick={(() => tabsFunction(2))}>
                            <Button children={'Multi Choice'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>


                        <div onClick={(() => tabsFunction(3))}>
                            <Button children={'Single Choice'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>

                        <div onClick={(() => tabsFunction(4))}>
                            <Button children={'Dropdown'} styles={{
                                border: '1px solid var(--primary-color)',
                                fontSize: '14px',
                                color: 'var(--text-color)',
                                borderRadius: '5px',
                                padding: '8px 20px',
                                backgroundColor: 'transparent'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='questions_list_wrapper4562'>
                    {allQuestions?.length <= 0 && <p style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: 'var(--primary-color)'
                    }}>No questions found...</p>}
                    {allQuestions?.length > 0 && allQuestions?.map((element, index) => (
                        <div className='added_modules_wrapper' key={index}>
                            <div className='add_modules_enu_wrapper'>
                                <img src={menu} />
                                <p>{element?.question_text} <small style={{
                                    fontSize: '10px',
                                    marginLeft: '5px'
                                }}>{element?.type}</small></p>
                            </div>
                            <div className='edit_modules_wrapper'>
                                <img onClick={(() => {
                                    getSingleData(index)
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
                                <img onClick={(() => handleChange(element?.id))} src={deleteicon} />
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default SinglelifeElement
