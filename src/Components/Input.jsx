import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder, required, value, defaultValue }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <input type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input

