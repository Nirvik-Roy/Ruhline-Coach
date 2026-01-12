import React from 'react'
import './Pagination.css'
const Pagination = () => {
    return (
        <>
            <div className='pagination_wrapper'>
                <i style={{
                    color: '#a7a7a7ff'
                }} class="fa-solid fa-angle-left"></i>
                <p style={{
                    border: '1px solid #c6c6c6ff '
                }}>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>...</p>
                <p>10</p>
                <i class="fa-solid fa-angle-right"></i>
            </div>
        </>
    )
}

export default Pagination
