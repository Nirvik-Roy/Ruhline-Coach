import React from 'react'

const ModalLoader = () => {
    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999999999999999',
                pointerEvents: 'none',
                flexDirection: 'column'
            }}>

                <span class="loader"></span>
                <p style={{
                    marginTop: '10px',
                    fontWeight: '500',
                    color: 'var(--text-color-)'
                }}>Loading...</p>
            </div>
        </>
    )
}

export default ModalLoader
