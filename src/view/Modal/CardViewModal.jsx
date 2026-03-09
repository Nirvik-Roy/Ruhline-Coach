import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Textarea from '../../Components/Textarea.jsx'
const CardViewModal = ({ setModal, singleData }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setModal(false))}></div>
            <div className='modal_div'>
                <h4>View card</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setModal(false))}></i>
                <form className='modal_form'>
                    <Input label={'Card Name'} readOnly={true} required={true} value={singleData?.name} />
                    <Textarea label={'Description'} readOnly={true} defaultValue={
                        singleData?.description
                    } required={true} />

                    {/* <div onClick={(() => setModal(false))} className='change_cancel_wrapper'>
                        <Button children={'Save'} />
                    </div> */}
                </form>
            </div>
        </>
    )
}

export default CardViewModal
