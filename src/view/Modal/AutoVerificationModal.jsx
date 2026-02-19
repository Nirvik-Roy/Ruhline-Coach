import tick from '../../assets/Layer_1.png'
import { Link } from 'react-router-dom'
const AutoVerificationModal = () => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper'></div>
            <div className='payment_succesful_modal'>
                <i class="fa-solid fa-xmark" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}></i>
                <img src={tick} />
                <h1>Auto Verifiying</h1>
                <p style={{
                    marginTop: '-15px'
                }}>Auto verifiying... Plz be paitent..</p>
            </div>
        </>
    )
}

export default AutoVerificationModal
