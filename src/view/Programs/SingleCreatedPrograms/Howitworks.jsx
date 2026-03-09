import React from 'react'
import img from '../../../assets/Rectangle 6716.png'
const Howitworks = () => {
    return (
        <>
            
            {<div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>How It Works</h3>
                    <div className='faq_accordion_wrapper'>
                        <div className='faq_accordion' >
                            <div className='faq_head_wrapper'>
                                <h3>Hello </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='service_expert_right service_long_img'>
                    <img src={ img} />
                </div>
            </div>}
        </>
    )
}

export default Howitworks
