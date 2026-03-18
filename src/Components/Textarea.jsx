import React from 'react'
import './Input.css'
const Textarea = ({ label, value, placeholder, required, styles, defaultValue, readOnly, onChange, name }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea name={name} onChange={onChange} value={value} readOnly={readOnly} style={styles} defaultValue={defaultValue} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
