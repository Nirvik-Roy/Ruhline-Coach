import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const EditwordModal = ({ seteditModal, singleData, handleChange, updateWord }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit word</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input name={'word'} onChange={handleChange} value={singleData?.word} label={'Word'} required={true} placeholder={'Enter word'} />
                </div>

                <Button onClick={(() => { updateWord(singleData?.word, singleData.id ) })} children={'Update'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default EditwordModal
