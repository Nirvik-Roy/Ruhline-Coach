import React from 'react'
import Textarea from '../../Components/Textarea'
import Button from '../../Components/Button'

const EditDescriptiveModal = ({ tabsFunction, singleData, editQuestionText, editQuestions, editErrors, title,loading }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => tabsFunction(0))}></div>
            <div className='modal_div'>
                <h4>{title} Descriptive</h4>
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

                    {title == 'Edit' && <div
                        className="change_cancel_wrapper"
                        style={{ margin: "20px 0 0 0" }}
                    >
                        <button></button>

                        <Button
                            loading={loading}
                            loadingText='Updating...'
                            onClick={(() => editQuestions(singleData?.id))}
                            children="Update"
                        />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default EditDescriptiveModal
