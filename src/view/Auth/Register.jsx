import React from 'react'
import './Auth.css'
import {Link} from 'react-router-dom'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button.jsx'
import google from '../../assets/Button with icon.svg'
import apple from '../../assets/Button with icon (1).svg'
const Register = () => {
    return (
        <>
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Register</h2>

                    <form className='register_form_wrapper'>
                        <div className='form_grid_wrapper'>
                            <Input type={'text'} label={'First Name'} required={true} defaultValue={'Somali'} />
                            <Input type={'text'} label={'Last Name'} required={true} defaultValue={'Goswami'} />
                        </div>

                        <Input type={'email'} label={'Email Address'} defaultValue={'example@mail.com'} />
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Password <span>*</span></label>
                            <input style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' defaultValue={'123456'} />
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

                        <div className='terms_conditions_wrapper'>
                            <input type='checkbox'/>
                            <p>By continuing I agree with the Terms & Conditions, Privacy Policy</p>
                        </div>

                        <Button styles={{
                            width:'100%'
                        }} children={
                            'Create Account'
                        }/>

                        <h5 className='or_with_wrapper'>Or with</h5>

                        <div className='google_apple_wrapper'>
                            <img src={google}/>
                            <img src={apple}/>
                        </div>

                        <h5 className='log_in_link'>Already a Coach? <Link to={'/login'}>Log In</Link></h5>
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

export default Register
