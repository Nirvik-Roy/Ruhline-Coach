import React from 'react'
import './Button.css'
const Button = ({ children, styles, onClick }) => {
  return (
    <>
      <div style={styles} className='brown_button' onClick={onClick}>{children}</div>
    </>
  )
}

export default Button
