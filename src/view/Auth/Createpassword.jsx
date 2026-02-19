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
    const [navigateLogin, setnavigateLogin] = useState(false)
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
                console.log(res)
                if (res.success) {
                    setnavigateLogin(true)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field')
        }

    }

    useEffect(()=>{
     if(navigateLogin){
        navigate('/login')
     }
    },[navigateLogin])
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
                            <input name='password_confirmation' value={formData.password_confirmation} onChange={handleChange} style={{
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
