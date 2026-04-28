import React from 'react'
import './Button.css'
const Button = ({ children, styles, onClick, loading, loadingText = 'Loading' }) => {
  return (
    <>
      <button disabled={loading} style={styles} onClick={onClick} className='brown_button'>{loading ? <div style={{
        display: 'flex',
        justifyContent: 'flex-start', alignItems: 'center'
      }}>
        <div className='loader25'></div> <b style={{
          marginLeft: '10px',
        }}>{loadingText}</b>
      </div> : children}</button>
    </>
  )
}

export default Button
