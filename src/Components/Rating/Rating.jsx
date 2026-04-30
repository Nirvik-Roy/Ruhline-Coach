import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const Rating = ({value}) => {
    const [rating, setRating] = useState(value);
    const totalStars = 10;
    return (
        <>
            <div>
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size={20}
                            color={starValue <= rating ? "#ffc107" : "#e4e5e9"}
                            values={rating}
                            style={{ cursor: "pointer" }}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default Rating
