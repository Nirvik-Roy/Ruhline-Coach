import Slider from 'react-slick'
import bigImg from '../../../assets/Rectangle 445.png'
import smallImg from '../../../assets/Rectangle 6614.png'
import smallImg1 from '../../../assets/Rectangle 6615.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';

const SingleProgramDetails = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const [imageSrc, setimageSrc] = useState('')

    // Static data
    const staticData = {
        tag: "Featured Program",
        original_price: 2999,
        sale_price: 1999,
        program_category: {
            name: "Fitness & Wellness"
        },
        occurrence_type: "Weekly",
        description: "<p>This comprehensive program is designed to help you achieve your fitness goals through structured workouts and nutrition guidance. Perfect for beginners and intermediate levels looking to transform their lifestyle.</p><ul><li>Personalized workout plans</li><li>Nutrition guidance</li><li>Progress tracking</li><li>24/7 support</li></ul>"
    };

    return (
        <>
            <div className='one_time_service_details_wrapper'>
                <div className='left_one_time_service'>
                    <div className='service_big_img'>
                        <img src={bigImg} alt="Main program image" />
                        {imageSrc && <img src={imageSrc} alt="Selected thumbnail" />}
                    </div>
                    <div className='service_small_img_wrapper'>
                        <Slider {...settings}>
                            {[smallImg, smallImg1].map((e, i) => (
                                <div key={i} className='service_small_img'>
                                    <img
                                        onClick={() => setimageSrc(e)}
                                        src={e}
                                        alt={`Thumbnail ${i + 1}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='right_one_time_service_details'>
                    {staticData?.tag && <small>{staticData?.tag}</small>}
                    <div>
                        {staticData?.original_price
                            && <del>SAR {staticData?.original_price}</del>}
                        {staticData?.sale_price
                            && <h1>SAR {staticData?.sale_price}</h1>}
                    </div>
                    <span><strong>Categories: </strong>{staticData?.program_category?.name}</span>
                    <span><strong>Occurrence: </strong>{staticData?.occurrence_type}</span>
                    <span><strong>Duration: </strong>32 weeks</span>

                    <p dangerouslySetInnerHTML={{
                        __html: staticData?.description
                    }} />
                </div>
            </div>
        </>
    )
}

export default SingleProgramDetails