import React from 'react'
import Button from '../../Components/Button'

const ModuleUnlockModal = ({ title, setModal, unlockModulefunc, moduleUnlockedLoader }) => {
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
                <button></button>
                    <Button loading={moduleUnlockedLoader} loadingText='Unlocking...' children={'Yes'} />
                </div>
            </div>
        </>
    )
}

export default ModuleUnlockModal
