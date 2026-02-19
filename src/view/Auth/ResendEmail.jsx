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
    const resendEmail = async () => {
        if (email != '') {
            try {
                setloading(true);
                const res = await resendEmailApi({email:email});
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
                    <h2>Please enter the email associated with your account.</h2>

                    <form className='register_form_wrapper'>
                        <Input onChange={((e) => setemail(e.target.value))} type={'email'} label={'Email Address'} placeholder={'Enter email address'} />

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
