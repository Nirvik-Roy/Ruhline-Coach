import React, { useEffect, useState } from 'react'
import './Payouts.css'
import Pagination from '../../../Components/Pagination/Pagination.jsx'
import img from '../../../assets/User Info.png'
import eye from '../../../assets/elements.svg'
import { getPayoutList } from '../../../utils/payout'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import PayoutViewModal from '../../Modal/PayoutsViewModal.jsx'
const Payouts = () => {
    const [loading, setloading] = useState(false);
    const [payoutList, setpayoutList] = useState([]);
    const [items, setitems] = useState([]);
    const [singlePayout, setSinglePayout] = useState()
    const [modalIsOpen, setmodalIsOpen] = useState(false)
    const callPayoutFunction = async () => {
        setloading(true)
        const res = await getPayoutList()
        if (res?.success) {
            setpayoutList(res?.data)
            setitems(res?.data?.groups[0]?.items)
        }
        setloading(false)
    }

    useEffect(() => {
        callPayoutFunction()
    }, [])

    // Pagination logic only

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = items.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    const filterPayouts = (i) => {
        const filteredData = items.filter((e) => e.id == i)
        setSinglePayout( ...filteredData )
    }


    return (
        <>
            {loading && <Loaders />}
            {modalIsOpen && <PayoutViewModal singlePayout={singlePayout} setmodalIsOpen={setmodalIsOpen} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Payouts</h2>
                    </div>
                    <div className='coaches_button_wapper' style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <p style={{
                            color: 'var(--text-color)',
                            fontWeight: '600'
                        }}>View by:</p>
                        <div className='total_orders_select_wrapper'>
                            <div style={{
                                position: 'relative',
                                cursor: 'pointer',
                                gap: '5px',
                                alignItems: 'center'
                            }}>
                                <p>
                                    Weekly
                                </p>
                                <i class="fa-solid fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='payouts_payments_summary_wrapper'>
                    <div className='payouts_summary'>
                        <h4>Total payments received</h4>
                        <h1>SAR {payoutList?.summary?.total_payment_received || 0}</h1>
                    </div>
                    <div className='payouts_summary'>
                        <h4>Total payments pending</h4>
                        <h1>SAR {payoutList?.summary?.total_pending_payments || 0}</h1>
                    </div>
                </div>
                <div className='table_container' style={{
                    minHeight: '50vh'
                }}>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Programs</th>
                                <th>Amount</th>
                                <th>Commission Rate (%)</th>
                                <th>Payment Receive Mode </th>
                                <th>Payment Status </th>
                                <th style={{
                                    textAlign: 'center'
                                }}>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((e) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className='customer_img_div'>
                                                <img src={img} />
                                            </div>
                                            <div className='customer_details_wrapper'>
                                                <p>{e?.program?.name}</p>
                                                <p>#{e?.program?.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.currency} {e?.coach_earning_amount}</td>
                                    <td style={{
                                        paddingLeft: '50px'
                                    }}>{e?.commission_rate}</td>
                                    <td>Bank Transfer</td>
                                    <td>
                                        <p style={e?.status == 'paid' ? {
                                            background: 'green',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            width: 'fit-content',
                                            position: 'relative',
                                            zIndex: '-1',
                                            textTransform: 'capitalize',
                                        } : {
                                            background: 'red',
                                            padding: '4px',
                                            borderRadius: '5px',
                                            color: '#fff',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            width: 'fit-content',
                                            position: 'relative',
                                            zIndex: '-1',
                                            textTransform: 'capitalize'
                                        }}>{e?.status}</p>
                                    </td>
                                    <td>
                                        <img onClick={(() => { filterPayouts(e?.id) 
                                        setmodalIsOpen(true)
                                         })} style={{
                                            position: 'relative',
                                            zIndex: '0'
                                        }} src={eye} />
                                    </td>
                                </tr>
                            ))}

                            {/* <tr>
                                <td colSpan={12} style={{
                                    padding: '15px 20px',
                                    background: 'rgba(217, 217, 217, 1)',
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    fontSize: '15px',
                                    textAlign: 'left'
                                }}>Month: January, 2026</td>
                            </tr> */}

                        </tbody>
                    </table>
                </div>
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default Payouts
