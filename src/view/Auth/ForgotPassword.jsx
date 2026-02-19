import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import toast from 'react-hot-toast'
import { forgotPasswordApi } from '../../utils/ForgotPaswordMail'
import Loaders from '../../Components/Loaders/Loaders'
const ForgotPassword = () => {
    const [email, setemail] = useState("");
    const [loading, setloading] = useState(false)
    const sendEmail = async () => {
        if (email != '') {
            try {
                setloading(true);
                const res = await forgotPasswordApi({ email: email });
                console.log(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter your email')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Forgot Password</h2>
                    <p>Please enter the email associated with your account.</p>
                    <form className='register_form_wrapper'>
                        <Input onChange={((e) => setemail(e.target.value))} type={'email'} placeholder={'Enter email'} label={'Email Address'} />

                        <Button onClick={sendEmail} styles={{
                            width: '100%'
                        }} children={
                            'Send Link'
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

export default ForgotPassword
