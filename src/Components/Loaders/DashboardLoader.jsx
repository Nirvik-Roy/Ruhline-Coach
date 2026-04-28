import React from 'react'
import './Loaders.css'
const DashboardLoader = () => {
    return (
        <>
            <div style={{
                position: 'fixed',
                top: '0px',
                right: '0',
                width: 'calc(100% - 260px)',
                height: '100vh',
                // background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9',
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

export default DashboardLoader
