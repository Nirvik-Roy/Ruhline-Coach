import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder, required, value, defaultValue,name, onChange }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <input onChange={onChange} type={type} name={name} value={value} defaultValue={defaultValue} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input

