import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import Button from '../../Components/Button.jsx'
import { useState } from 'react'
import { resendEmailApi } from '../../utils/ResendMail.js'
import toast from 'react-hot-toast'
import Loaders from '../../Components/Loaders/Loaders.jsx'

const ResendEmail = () => {
    const [email, setemail] = useState("");
    const [loading, setloading] = useState(false)
    const [emailErrormessage, setEmailerrorMessage] = useState('');
    const [errors,seterrors] = useState()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ValidateEmail = (email) => {
        if (!email) {
            return setEmailerrorMessage('* Email is Required')
        }
        if (!emailRegex.test(email)) {
            return setEmailerrorMessage('* Please Enter a vaild email address')
        }
        return setEmailerrorMessage('');
    }
    const resendEmail = async () => {
        if (email != '' && emailErrormessage=='') {
            try {
                setloading(true);
                const res = await resendEmailApi({ email: email });
                console.log(res)
                seterrors(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter your email properly')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Resend Verification</h2>
                    <p>Please enter the email associated with your account.</p>

                    <form className='register_form_wrapper'>
                        <Input onChange={((e) => {
                            ValidateEmail(e.target.value)
                            setemail(e.target.value)
                        })} type={'email'} label={'Email Address'} placeholder={'Enter email address'} />

                        {emailErrormessage &&  <small style={{
                            color:'red',
                            fontSize:'12px',
                            display:'block',
                            marginTop:'-10px',
                            fontWeight:'600'
                        }}>{emailErrormessage}</small>}
                        {errors?.email && <small style={{
                            color: 'red',
                            fontSize: '12px',
                            display: 'block',
                            marginTop: '-10px',
                            fontWeight: '600'
                        }}>*{errors?.email[0]}</small>}
                        <Button onClick={resendEmail} styles={{
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

export default ResendEmail
