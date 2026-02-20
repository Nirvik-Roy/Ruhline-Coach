import React, { useEffect, useState } from 'react'
import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button.jsx'
import google from '../../assets/Button with icon.svg'
import apple from '../../assets/Button with icon (1).svg'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { Authregister } from '../../Store/Slices/RegisterSlice/AuthRegisterSlice.js'
import toast from 'react-hot-toast'
import RegisterSuccessModal from '../Modal/RegisterSuccessModal.jsx'
import AutoVerificationModal from '../Modal/AutoVerificationModal.jsx'
import VerficationDoneModal from '../Modal/VerficationDoneModal.jsx'
import { Autoverify } from '../../Store/Slices/AutoVerificationSlice/AutoVerificationSlice.js'
import { verifyToken } from '../../Store/Slices/Loginslice/AuthSlice.js'
const Register = () => {
    const location = useLocation();
    const [verificationChecking, setverificationChecking] = useState(false)
    const [loading, setloading] = useState(false);
    const [registerSuccess, setregisterSuccess] = useState();
    const [verifiedSuccess, setverifiedSuccess] = useState(false)
    const { isLogin, isLoading, errors } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const [formData, setformData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ''
    })
    const autoVerifaction = async (data) => {
        try {
            const res = await dispatch(Autoverify(data));
            if (res.type === 'Autoverify/fulfilled') {
                setverifiedSuccess(true)
                setverificationChecking(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        // Check path
        if (location.pathname.startsWith("/verify-email")) {
            setverificationChecking(true)
            // Extract query params
            const params = new URLSearchParams(location.search);
            const id = params.get("id");
            const hash = params.get("hash");
            const expires = params.get("expires");
            const signature = params.get("signature");
            // Only dispatch if all present
            if (id && hash && expires && signature) {
                const data = { id, hash, expires, signature };
                if (data.id != '', data.hash != '', data.expires != '', data.signature != '') {
                    autoVerifaction(data)
                }
            }
        }
    }, [location, dispatch]);

    useEffect(() => {
        dispatch(verifyToken());
    }, [dispatch]);

    const navigate = useNavigate()
    useEffect(() => {
        if (
            isLogin &&
            (location.pathname === "/")
        ) {
            navigate("/dashboard/appoinments", { replace: true });
        }
    }, [isLogin, location.pathname, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        if (formData.first_name != '' && formData.last_name != '', formData.email != '' && formData.password != '' && formData.password_confirmation != '') {
            try {
                setloading(true)
                const res = await dispatch(Authregister(formData))
                console.log(res)
                if (res.type === 'Authregister/fulfilled') {
                    setregisterSuccess(true)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter all the fields')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            {registerSuccess && <RegisterSuccessModal setregisterSuccess={setregisterSuccess} />}
            {verificationChecking && <AutoVerificationModal />}
            {verifiedSuccess && <VerficationDoneModal setverifiedSuccess={setverifiedSuccess} />}
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Register</h2>

                    <form className='register_form_wrapper'>
                        <div className='form_grid_wrapper'>
                            <div>
                                <Input onChange={handleChange} name={'first_name'} value={formData.first_name} type={'text'} label={'First Name'} required={true} placeholder={'Enter first name'} />
                            </div>
                            <div>
                                <Input name={'last_name'} value={formData.last_name} onChange={handleChange} type={'text'} label={'Last Name'} required={true} placeholder={'Enter last name'} />
                            </div>
                        </div>
                        <div>
                            <Input onChange={handleChange} name={'email'} value={formData.email} type={'email'} label={'Email Address'} placeholder={
                                'Enter email'
                            } />
                        </div>

                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Password <span>*</span></label>
                            <input onChange={handleChange} name='password' value={formData.password} style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />
                            <small style={{
                                fontSize: '12px',
                                marginLeft: '10px'
                            }}>8+ characters</small>
                        </div>


                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Confirm Password <span>*</span></label>
                            <input onChange={handleChange} name='password_confirmation' value={formData.password_confirmation} style={{
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

                        {/* <div className='terms_conditions_wrapper'>
                            <input type='checkbox' />
                            <p>By continuing I agree with the Terms & Conditions, Privacy Policy</p>
                        </div> */}
                        <div onClick={handleSubmit}>
                            <Button styles={{
                                width: '100%'
                            }} children={
                                'Create Account'
                            } />
                        </div>

                        <h5 className='or_with_wrapper'>Or with</h5>

                        <div className='google_apple_wrapper'>
                            <img src={google} />
                            <img src={apple} />
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
