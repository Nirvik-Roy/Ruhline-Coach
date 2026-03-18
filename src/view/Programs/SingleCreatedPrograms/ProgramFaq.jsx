import React from 'react'
import FaqAccordion from './FaqAccordion'
import img from '../../../assets/Rectangle 6716.png'
const ProgramFaq = ({ singleProgramData }) => {
    return (
        <>

            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3 style={{
                        fontSize: '25px',
                        color: 'var(--text-color)'
                    }}>FAQs</h3>
                    <FaqAccordion singleProgramData={singleProgramData} />
                </div>
                <div className='service_expert_right service_long_img'>
                    <img src={singleProgramData?.faqs_section_image || img} />
                </div>
            </div>
        </>
    )
}

export default ProgramFaq
