import React from 'react'
import img from '../../../assets/Rectangle 6716.png'
const Benefits = ({ singleProgramData }) => {
    return (
        <>

            <>

                <div className='service_expect_wrapper'>
                    <div className='service_expert_left'>
                        <h3 style={{
                            fontSize: '25px',
                            color: 'var(--text-color)'
                        }}>Benefits</h3>
                        <div className='faq_accordion_wrapper'>
                            {singleProgramData?.benefits?.length <= 0 && <p style={{
                                color: 'var(--primary-color)'
                            }}>No how it works data added...</p>}
                            {singleProgramData?.benefits?.map((element, index) => (
                                <div className='faq_accordion' key={index}>
                                    <div className='faq_head_wrapper'>
                                        <h3>{element?.description} </h3>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='service_expert_right service_long_img'>
                        <img src={singleProgramData?.benefits_section_image || img} />
                    </div>
                </div>
            </>

        </>
    )
}

export default Benefits
