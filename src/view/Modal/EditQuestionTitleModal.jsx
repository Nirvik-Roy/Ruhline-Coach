import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input.jsx'
import Button from '../../Components/Button'

const EditQuestionTitleModal = ({ editQuestionSet, seteditTitleModal, singleSet }) => {
    console.log()
    const [title, settitle] = useState('')
    useEffect(() => {
        settitle(singleSet[0]?.title)
    }, [singleSet])
    return (
        <>
            <div className='modal_wrapper' onClick={(() => seteditTitleModal(false))}></div>

            <div className='modal_div'>
                <h4>Edit Question</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditTitleModal(false))}></i>
                <div style={{ margin: "20px 0" }}>
                    <Input label={'Question Title'} value={title} onChange={((e) => settitle(e.target.value))} placeholder={'Enter question title...'} />
                    <div style={{ margin: "20px 0" }}>
                        <Button onClick={(() => editQuestionSet(title))} children={'Update'} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default EditQuestionTitleModal
