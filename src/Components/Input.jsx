import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder, required, value, defaultValue,name, onChange,fieldNecessary,readOnly }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <input readOnly={readOnly} required={fieldNecessary} onChange={onChange} type={type} name={name} value={value} defaultValue={defaultValue} placeholder={placeholder} />
            </div>
        </>
    )
}

export default Input

