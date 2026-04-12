import React from 'react'

const PayoutViewModal = ({ setmodalIsOpen, singlePayout }) => {
    console.log(singlePayout)
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setmodalIsOpen(false))}></div>
            <div className='modal_div'>
                <i class="fa-solid fa-xmark" onClick={(() => setmodalIsOpen(false))}></i>
                <div className='payout_content_wrapper'>
                    <ul>
                        <li><strong>Progam Name:</strong>{singlePayout?.program?.name}</li>
                        <li><strong>Progam ID:</strong>#{singlePayout?.program?.id}</li>
                        <li><strong>Commission %</strong>{singlePayout?.commission_rate}</li>
                        <li><strong> Amount:</strong>{singlePayout?.currency} {singlePayout?.coach_earning_amount}</li>
                        {singlePayout?.transaction_number && <li><strong>Transaction Number:</strong>{singlePayout?.transaction_number}</li>}
                        {singlePayout?.payment_receipt_url && (
                            <p
                                style={{
                                    color: 'var(--primary-color)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontSize:'12px',
                                    textDecoration:'underline'
                                }}
                                onClick={() => {
                                    window.open(singlePayout.payment_receipt_url, '_blank');
                                }}
                            >
                                Payment Receipt
                            </p>
                        )}
                        <li><strong>Status:</strong><span style={singlePayout?.status == 'paid' ? {
                            background: 'green',
                            padding: '4px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '400',
                            width: 'fit-content',
                            textTransform: 'capitalize'
                        } : {
                            background: 'red',
                            padding: '4px',
                            borderRadius: '5px',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '400',
                            width: 'fit-content',
                            textTransform: 'capitalize'
                        }
                        }>{singlePayout?.status}</span></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default PayoutViewModal
