import React from 'react'
import './Input.css'
const Textarea = ({ label, placeholder, required,styles,defaultValue }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea style={styles} defaultValue={defaultValue} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
