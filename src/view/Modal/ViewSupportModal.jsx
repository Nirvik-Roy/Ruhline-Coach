import React, { useEffect, useState } from 'react'
import { getSingleDispute } from '../../utils/dispute'
import Loaders from '../../Components/Loaders/Loaders'

const ViewSupportModal = ({ setviewModal, viewId }) => {
    const [singleDispute, setsingleDispute] = useState({})
    const [loading, setloading] = useState(false)
    const fetchSingleDipute = async () => {
        setloading(true)
        const res = await getSingleDispute(viewId)
        setsingleDispute(res)
        setloading(false)
    }

    useEffect(() => {
        if (viewId) {
            fetchSingleDipute()
        }
    }, [])

    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setviewModal(false))}>
            </div>
            <div className='modal_div'>
                <h4>#{singleDispute?.id} <span style={singleDispute?.status == 'open' ? {
                    fontSize: '12px',
                    background: 'red',
                    padding: ' 3px 5px',
                    color: "#fff",
                    borderRadius: '5px',
                    textTransform: 'capitalize'
                } : {
                    fontSize: '12px',
                    background: 'green',
                    padding: ' 3px 5px',
                    color: "#fff",
                    borderRadius: '5px',
                    textTransform: 'capitalize'
                }}>{singleDispute?.status}</span></h4>
                <i class="fa-solid fa-xmark" onClick={(() => setviewModal(false))}></i>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                    marginTop: '20px'
                }}>
                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Date/Time:</strong>
                        <span>{new Date(singleDispute?.created_at)
                            .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: 'utc' })}</span>
                    </p>
                    {singleDispute?.program && <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Program:</strong>
                        <span style={{
                            textTransform: 'capitalize'
                        }}>{singleDispute?.program?.name}</span>
                    </p>}


                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Dispute Category:</strong>
                        <span style={{
                            textTransform: 'capitalize'
                        }}>{singleDispute?.category}</span>
                    </p>



                    {singleDispute?.payout && <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Transaction:</strong>
                        <span>#{singleDispute?.payout?.id}</span>
                    </p>}

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Subject:</strong>
                        <span>{singleDispute?.subject}</span>
                    </p>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '16px',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        <strong>Dispute Description:</strong>
                        <span>{singleDispute?.description}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ViewSupportModal
