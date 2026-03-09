import React from 'react'
import crossIcon from '../../assets/Frame 1984078314.svg'
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'

const EditDropdownModal = ({ tabsFunction, singleData, editAddEmptyOption, editdeleteOption, editOptionValue, editQuestionText, editQuestions, editErrors }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => tabsFunction(0))}></div>
            <div className='modal_div'>
                <h4>Edit Dropdown</h4>
                <i class="fa-solid fa-xmark" onClick={(() => tabsFunction(0))}></i>



                <div style={{ margin: "20px 0" }}>

                    {/* Question Textarea */}
                    <Textarea
                        onChange={((e) => editQuestionText(e))}
                        styles={{ height: "70px" }}
                        label="Question"
                        name={'question_text'}
                        required={true}
                        value={singleData?.question_text || ''}
                    />
                    {editErrors?.question_text && <small style={{
                        color: 'red',
                    }}>*{editErrors?.question_text[0]}</small>}

                    {/* Options Header + Add Button */}
                    <div className="options_wrapper466885">
                        <h3>Options</h3>
                        <Button
                            onClick={editAddEmptyOption}
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
                        {singleData.options.map((opt, optIndex) => (
                            <div
                                className="options_1_wrapper456"
                                key={optIndex}
                            >
                                <div className="option_left_wrapper">
                                    <Textarea
                                        label={`Option ${optIndex + 1}`}
                                        required={true}
                                        styles={{ height: "70px" }}
                                        value={opt}
                                        placeholder="Enter option"
                                        onChange={((e) => editOptionValue(optIndex, e.target.value))}
                                    />
                                </div>

                                <div className="option_right_wrapper">
                                    <img
                                        src={crossIcon}
                                        alt="remove"
                                        style={{ cursor: "pointer" }}
                                        onClick={(() => editdeleteOption(optIndex))}
                                    />
                                </div>
                            </div>
                        ))}
                        {editErrors?.options && <small style={{
                            color: 'red',
                        }}>*{editErrors?.options[0]}</small>}
                        {/* Submit Button */}
                        <div
                            className="change_cancel_wrapper"
                            style={{ margin: "20px 0 0 0" }}
                        >
                            <Button
                                onClick={(() => editQuestions(singleData?.id))}
                                children="Update"
                            />
                        </div>
                    </div>

                </div>




            </div>
        </>
    )
}

export default EditDropdownModal
