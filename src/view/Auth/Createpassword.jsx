import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button.jsx'
import { useDispatch } from 'react-redux'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
import { ResetPasswordApi } from '../../utils/ResetPassword.js'
const Createpassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const [loading, setloading] = useState();
    const [errors, setErrors] = useState()
    const [navigateLogin, setnavigateLogin] = useState(false);
    const [type, setType] = useState(true)
    const [type2, setType2] = useState(true)
    const [formData, setformData] = useState({
        password: "",
        password_confirmation: ''
    })
    const [email, setemail] = useState('')
    const [token, settoken] = useState('')

    useEffect(() => {
        // Check path
        if (location.pathname.startsWith("/reset-password")) {
            setloading(true)
            // Extract query params
            const params = new URLSearchParams(location.search);
            const token = params.get("token");
            const email = params.get("email");
            // Only dispatch if all present
            if (token && email) {
                const data = { token, email };
                if (data.token != '', data.email != '') {
                    setemail(email)
                    settoken(token)
                    setloading(false)
                }
            } else {
                setloading(false)
            }
        }
    }, [location, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        if (formData.password != '' && formData.password_confirmation != "") {
            try {
                setloading(true)
                const res = await ResetPasswordApi({
                    email: email,
                    token: token,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                })
                if (res.success) {
                    setnavigateLogin(true)
                }
                setErrors(res)
                toast.error(errors.token[0])
                toast.error(errors.email[0])
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field')
        }

    }

    useEffect(() => {
        if (navigateLogin) {
            navigate('/login')
        }
    }, [navigateLogin])
    return (
        <>
            {loading && <Loaders />}
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Create a new password</h2>

                    <form className='register_form_wrapper'>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>New Password <span>*</span></label>
                            <input name='password' value={formData.password} onChange={handleChange} style={{
                                padding: '0 40px 0 15px '
                            }} type={!type ? 'text' : 'password'} placeholder='*********' />
                            {type && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} className="fa-regular fa-eye-slash" onClick={(() => setType(!type))}></i>}
                            {!type && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} className="fa-regular fa-eye" onClick={(() => setType(!type))}></i>}

                            {errors?.password
                                && <small style={{
                                    color: 'red',
                                    fontWeight: '500',
                                    fontSize: '11px'
                                }}>* {errors?.password[1]}</small>}
                        </div>

                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Confirm Password <span>*</span></label>
                            <input name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} style={{
                                padding: '0 40px 0 15px '
                            }} type={!type2 ? 'text' : 'password'} placeholder='*********' />
                            {/* <img style={{
                                position: 'absolute',
                                top: '50px',
                                right: '40px',
                                width: '15px',
                                cursor: 'pointer'
                            }} src={tick} /> */}
                            {errors?.password
                                && <small style={{
                                    color: 'red',
                                    fontWeight: '500',
                                    fontSize: '11px'
                                }}>* {errors?.password[0]}</small>}
                            

                            {type2 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} className="fa-regular fa-eye-slash" onClick={(() => setType2(!type2))}></i>}
                            {!type2 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} className="fa-regular fa-eye" onClick={(() => setType2(!type2))}></i>}
                        </div>
                        <Button onClick={handleSubmit} styles={{
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
