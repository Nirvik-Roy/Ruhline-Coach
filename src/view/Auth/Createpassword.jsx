import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button.jsx'
const Createpassword = () => {
    return (
        <>
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Create a new password</h2>

                    <form className='register_form_wrapper'>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>New Password <span>*</span></label>
                            <input style={{
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
                            <label>Confirm Password <span>*</span></label>
                            <input style={{
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
                                marginLeft: '10px',
                                fontWeight: '700',
                                display: 'block',
                                textDecoration: 'none'
                            }}>8+ characters</small>
                        </div>
                        <Button styles={{
                            width: '100%'
                        }} children={
                            'Reset Password'
                        } />
                    </form>
                </div>
                <div className='right_register'>
                    <img src={bg} />
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </h1>
                </div>
            </div>
        </>
    )
}

export default Createpassword
