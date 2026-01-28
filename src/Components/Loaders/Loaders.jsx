import React from 'react'
import './Loaders.css'
const Loaders = () => {
    return (
        <>
            <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100vh',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex:'9999999999999999'
            }}>

                <span class="loader"></span>
            </div>
        </>
    )
}

export default Loaders
