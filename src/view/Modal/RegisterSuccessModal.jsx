import React from 'react'
import tick from '../../assets/Layer_1.png'
import { Link } from 'react-router-dom'
const RegisterSuccessModal = ({ setregisterSuccess }) => {
  return (
    <>
      <div className='payment_succesful_modal_wrapper' onClick={(() => setregisterSuccess(false))}></div>
      <div className='payment_succesful_modal'>
        <i class="fa-solid fa-xmark" onClick={(() => setregisterSuccess(false))} style={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}></i>
        <img src={tick} />
        <h1>Registration Successful</h1>
        <p style={{
          marginTop: '-15px',
          zIndex:'9999'
        }}>Plz check your inbox and verify your email</p>
        <p>Don't get the link? <Link to={'/resend-email'} >Click to resend email</Link></p>
      </div>
    </>
  )
}

export default RegisterSuccessModal
