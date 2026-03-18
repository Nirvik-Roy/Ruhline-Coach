import React, { useState } from 'react'
import down from '../../../assets/Chevron.svg'
import right from '../../../assets/Chevron Right.svg'

const FaqAccordion = ({ singleProgramData }) => {
    const [faqIndex, setfaqIndex] = useState([]);

    const setIndex = (i) => {
        if (faqIndex.includes(i)) {
            setfaqIndex(prev => prev.filter(e => e !== i));

        } else {
            setfaqIndex([
                ...faqIndex,
                i
            ])
        }
    }

    const faqData = [
        {
            id: 1,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 3,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 4,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
        {
            id: 5,
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
        },
    ]
    return (
        <>
            <div className='faq_accordion_wrapper'>
                {singleProgramData?.faqs?.length <= 0 && <p style={{
                    color: 'var(--primary-color)'
                }}>No faqs added...</p>}
                {singleProgramData?.faqs?.map((e, i) => (
                    <div className='faq_accordion' key={i} onClick={(() => { setIndex(e.id) })}>
                        <div className='faq_head_wrapper'>
                            <h3>{e.heading}</h3>
                            {faqIndex.includes(e.id) && <div className='down_img56'>
                                <img src={down} />
                            </div>}

                            {!faqIndex.includes(e.id) && <div className='down_img57'>
                                <img src={right} />
                            </div>}
                        </div>
                        {faqIndex.includes(e.id) && <p dangerouslySetInnerHTML={{
                            __html: e?.description
                        }}></p>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default FaqAccordion
