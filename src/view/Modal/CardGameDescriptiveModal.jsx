import React from 'react'
import Input from '../../Components/Input'
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'
import { useParams } from 'react-router-dom'
const CardGameDescriptiveModal = ({ tabsFunction, dynamicOptions, postQuestions, updateQuestionText, errors, selectedIndex }) => {
    const { moduleId } = useParams()
    console.log(errors)
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div'>
                <h4>Descriptive</h4>
                <i className="fa-solid fa-xmark" onClick={() => tabsFunction(0)}></i>
                {
                    dynamicOptions[selectedIndex]?.questions?.map((question, questionIndex) => (
                        question.type === 'descriptive' ?
                            <div
                                key={`${questionIndex}`}
                                style={{ margin: '20px 0 0 0' }}
                            >
                                <Textarea
                                    onChange={(event) =>
                                        updateQuestionText(selectedIndex, questionIndex, event.target.value)
                                    }
                                    styles={{ height: '70px' }}
                                    label="Question"
                                    value={question.question_text}
                                    required={true}
                                    placeholder="Enter question"
                                />
                                {errors?.question_text &&
                                    <small style={{ color: 'red' }}>
                                        *{errors?.question_text[0]}
                                    </small>
                                }
                                <div
                                    className='change_cancel_wrapper'
                                    style={{ margin: '20px 0 0 0' }}
                                >
                                    <button onClick={() => tabsFunction(0)}>
                                        Cancel
                                    </button>
                                    <Button
                                        onClick={() => postQuestions()}
                                        children="Add"
                                    />
                                </div>
                            </div>
                            : null
                    ))
                }
            </div>
        </>
    )
}

export default CardGameDescriptiveModal
