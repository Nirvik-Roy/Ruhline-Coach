import Slider from 'react-slick'
import bigImg from '../../../assets/Rectangle 445.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';

const SingleProgramDetails = ({ singleProgramData }) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const [imageSrc, setimageSrc] = useState('')
    return (
        <>
            <div className='one_time_service_details_wrapper'>
                <div className='left_one_time_service'>
                    <div className='service_big_img'>
                        {!imageSrc && <img src={singleProgramData?.main_image || bigImg} alt="Main program image" />}
                        {imageSrc && <img src={imageSrc} alt="Selected thumbnail" />}
                    </div>
                    <div className='service_small_img_wrapper'>
                        <Slider {...settings}>
                            {singleProgramData?.gallery_images?.map((e, i) => (
                                <div key={i} className='service_small_img'>
                                    <img
                                        onClick={() => setimageSrc(e?.image_path)}
                                        src={e?.image_path}
                                        alt={`Thumbnail ${i + 1}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='right_one_time_service_details'>
                    {singleProgramData?.tag && <small style={{
                        textTransform: 'capitalize'
                    }}>{singleProgramData?.tag}</small>}
                    <div>
                        {singleProgramData?.original_price
                            && <del>SAR {singleProgramData?.original_price}</del>}
                        {singleProgramData?.sale_price
                            && <h1>SAR {singleProgramData?.sale_price}</h1>}
                    </div>
                    <span><strong>Categories: </strong>{singleProgramData?.program_category?.name}</span>
                    <span style={{
                        textTransform: 'capitalize'
                    }}><strong>Occurrence: </strong>{singleProgramData?.occurrence_type}</span>
                    {singleProgramData?.session_duration_minutes && <span><strong>Session Duration: </strong>{singleProgramData?.session_duration_minutes} mins</span>}
                    {singleProgramData?.sessions_per_week && <span><strong>Session per week: </strong>{singleProgramData?.sessions_per_week}</span>}
                    {singleProgramData?.tenure_weeks && <span><strong>Tenure per week: </strong>{singleProgramData?.tenure_weeks}</span>}

                    <p dangerouslySetInnerHTML={{
                        __html: singleProgramData?.description
                    }} />
                </div>
            </div>
        </>
    )
}

export default SingleProgramDetails