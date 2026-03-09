import React from 'react'
import Button from '../Button.jsx'

const DeleteModal = ({ title, onClick, details, setdeleteModal }) => {
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div' style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '25px',
                maxWidth: '450px'
            }}>
                <i class="fa-solid fa-xmark" onClick={(() => setdeleteModal(false))}></i>
                <h4>{title}</h4>
                <p>{details}</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: '20px'
                }}>
                    <div onClick={(() => setdeleteModal(false))}>

                    <Button  styles={{
                        border: 'none',
                        background: 'transparent',
                        color: '#000'
                    }} children={'Cancel'} />
                   </div>
                    <div onClick={onClick}>

                    <Button children={'Confirm'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal
