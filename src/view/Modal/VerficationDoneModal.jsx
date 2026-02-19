import React from 'react'
import tick from '../../assets/Layer_1.png'
import { Link } from 'react-router-dom'
const VerficationDoneModal = ({ setverifiedSuccess }) => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper' onClick={(() => setverifiedSuccess(false))}></div>
            <div className='payment_succesful_modal'>
                <i class="fa-solid fa-xmark" onClick={(() => setverifiedSuccess(false))} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}></i>
                <img src={tick} />
                <h1>Verification Done</h1>
                <p style={{
                    marginTop: '-15px',
                    textAlign: 'center'
                }}>Verification Done! Wait for the admin to approve your profile</p>
            </div>
        </>
    )
}

export default VerficationDoneModal
