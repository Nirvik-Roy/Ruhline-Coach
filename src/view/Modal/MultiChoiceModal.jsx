import React from 'react'
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'
import crossIcon from '../../assets/Frame 1984078314.svg'
import Input from '../../Components/Input'
import { useParams } from 'react-router-dom'
const MultiChoiceModal = ({ tabsFunction, addEmptyOption, removeOption, updateQuestionText, updateOptionText, dynamicOptions, postQuestions, errors }) => {
    const { moduleId } = useParams()
    return (
        <>
            <div className='modal_wrapper' onClick={(() => tabsFunction(0))}></div>
            <div className='modal_div'>
                <h4>Multi Choice</h4>
                <i class="fa-solid fa-xmark" onClick={(() => tabsFunction(0))}></i>
                {
                    dynamicOptions?.length > 0 &&
                    dynamicOptions.map((e, qIndex) => (
                        e.type === "multi_choice" ? (
                            <div key={qIndex} style={{ margin: "20px 0" }}>

                                {/* Question Textarea */}
                                <Textarea
                                    styles={{ height: "70px" }}
                                    label="Question"
                                    required={true}
                                    value={e.question_text}
                                    onChange={(event) =>
                                        updateQuestionText(qIndex, event.target.value)
                                    }
                                />
                                {errors?.question_text && <small style={{
                                    color:'red',
                                }}>*{errors?.question_text[0]}</small>}

                                {/* Options Header + Add Button */}
                                <div className="options_wrapper466885">
                                    <h3>Options</h3>
                                    <Button
                                        onClick={() => addEmptyOption(qIndex)}
                                        children="Add Option"
                                        styles={{
                                            backgroundColor: "transparent",
                                            border: "1px solid var(--primary-color)",
                                            color: "var(--text-color)",
                                            padding: "10px",
                                            fontSize: "12px",
                                        }}
                                    />
                                </div>

                                {/* Render Each Option */}
                                <div className="options_list_wrapper46656">
                                    {e.options.map((opt, optIndex) => (
                                        <div
                                            className="options_1_wrapper456"
                                            key={`${qIndex}-opt-${optIndex}`}
                                        >
                                            <div className="option_left_wrapper">
                                                <Textarea
                                                    label={`Option ${optIndex + 1}`}
                                                    required={true}
                                                    styles={{ height: "70px" }}
                                                    value={opt}
                                                    placeholder="Enter option"
                                                    onChange={(event) =>
                                                        updateOptionText(
                                                            qIndex,
                                                            optIndex,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="option_right_wrapper">
                                                <img
                                                    src={crossIcon}
                                                    alt="remove"
                                                    onClick={() =>
                                                        removeOption(qIndex, optIndex)
                                                    }
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {errors?.options && <small style={{
                                        color: 'red',
                                    }}>*{errors?.options[0]}</small>}

                                    {/* Submit Button */}
                                    <div
                                        className="change_cancel_wrapper"
                                        style={{ margin: "20px 0 0 0" }}
                                    >
                                        <Button
                                            onClick={() => postQuestions(moduleId)}
                                            children="Add"
                                        />
                                    </div>
                                </div>

                            </div>
                        ) : null
                    ))
                }

            </div>
        </>
    )
}

export default MultiChoiceModal
