import { Link } from 'react-router-dom'
import bg from '../../assets/1ead06fbd0868b8d5a4743b9171f9405bb5b0dbc(1).jpg'
import logo from '../../assets/Frame 1984078480.svg'
import Input from '../../Components/Input.jsx'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button.jsx'
const EmailAssociate = () => {
  return (
    <>
          <div className='register_wrapper'>
                <div className='left_register'>
                    <img src={logo} />
                    <h2>Please enter the email associated with your account.</h2>

                    <form className='register_form_wrapper'>
                        <Input type={'email'} label={'Email Address'} defaultValue={'example@mail.com'} />
                    

                        <Button styles={{
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

export default EmailAssociate
