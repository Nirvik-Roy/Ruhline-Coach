import React from 'react'
import tick from '../../assets/Layer_1.png'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
const RegisterSuccessModal = ({ setregisterSuccess }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='payment_succesful_modal_wrapper' onClick={(() => setregisterSuccess(false))}></div>
      <div className='payment_succesful_modal'>
        <i class="fa-solid fa-xmark" onClick={(() =>{ 
          navigate('/login')
          setregisterSuccess(false)})} style={{
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}></i>
        <img src={tick} />
        <h1>Registration Successful</h1>
        <p style={{
          marginTop: '-15px',
          zIndex:'9999'
        }}>Please check your inbox and verify your email</p>
        <p>Don't get the link? <Link to={'/resend-email'} >Click to resend email</Link></p>
        <Button styles={{
          width: '100%',
        }} children={'OK'} onClick={()=>navigate('/login')}/>
      </div>
    </>
  )
}

export default RegisterSuccessModal
