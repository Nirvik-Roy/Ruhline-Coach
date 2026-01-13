import React from 'react'
import Button from '../../Components/Button'

const ModuleUnlockModal = ({ title, setModal, unlockModulefunc }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setModal(false))}></div>
            <div className='modal_div'>
                <h4>{title}</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setModal(false))}></i>
                <p style={{
                    margin: '20px 0'
                }}>Do you want to unlock it?</p>
                <div onClick={(() => unlockModulefunc())} className='change_cancel_wrapper'>
                    <Button children={'Yes'} />
                </div>
            </div>
        </>
    )
}

export default ModuleUnlockModal
