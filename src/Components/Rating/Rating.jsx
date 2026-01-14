import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const Rating = () => {
    const [rating, setRating] = useState(0);
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
                            onClick={() => setRating(starValue)}
                            style={{ cursor: "pointer" }}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default Rating
