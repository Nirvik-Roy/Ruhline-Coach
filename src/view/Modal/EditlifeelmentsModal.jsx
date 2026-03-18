import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const EditlifeelmentsModal = ({ seteditModal, singleData, handleChange, updateLifeElements }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit name</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input name={'name'} onChange={handleChange} value={singleData?.name} label={'Life elements'} required={true} placeholder={'Enter word'} />
                </div>

                <Button onClick={(() => { updateLifeElements(singleData?.name, singleData.id) })} children={'Update'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default EditlifeelmentsModal
