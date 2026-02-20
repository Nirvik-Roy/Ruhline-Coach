import React from 'react'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button'
const ChangePasswordModal = ({ setchangePassword }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setchangePassword(false))}></div>
            <div className='modal_div'>
                <h4>Change Password</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setchangePassword(false))}></i>
                <div className='modal_form'>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label> Password <span>*</span></label>
                        <input name='password' style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />
                    </div>


                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label> Confirm Password <span>*</span></label>
                        <input name='password_confirmation' style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />
                        <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} />
                        <small style={{
                            fontSize: '12px',
                            marginLeft: '10px'
                        }}>8+ characters</small>
                    </div>
                </div>
                <div className='change_cancel_wrapper'>
                    <Button children={'Change'} />
                </div>
            </div>
        </>
    )
}

export default ChangePasswordModal
