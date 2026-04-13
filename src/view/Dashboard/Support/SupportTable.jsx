import { useEffect, useRef, useState } from 'react'
import Button from '../../../Components/Button.jsx'
import AddSupportModal from '../../Modal/SupportModal.jsx'
import { deleteDispute, getDisputeList } from '../../../utils/dispute.js';
import Loaders from '../../../Components/Loaders/Loaders.jsx';
import ellipse from '../../../assets/_MoreIcon_.svg'
import Pagination from '../../../Components/Pagination/Pagination.jsx';
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx';
import SupportModal from '../../Modal/SupportModal.jsx';
import ViewSupportModal from '../../Modal/ViewSupportModal.jsx';
const SupportTable = () => {
    const [modalIsopen, setmodalIsopen] = useState(false);
    const [disputeList, setdisputeList] = useState([]);
    const [loading, setloading] = useState(false);
    const [index, setIndex] = useState([]);
    const [editId, seteditId] = useState()
    const [edit, setedit] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const [deletedId, setdeleteId] = useState();
    const [viewModal,setviewModal] = useState(false);
    const [viewId,setviewId] = useState()
    const dropdownRef = useRef(null);

    const callDisputeList = async () => {
        setloading(true)
        const res = await getDisputeList()
        setdisputeList(res?.data)
        setloading(false)
    }

    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    useEffect(() => {
        callDisputeList()
    }, [])

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = disputeList?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(disputeList?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleDelete = async () => {
        setloading(true)
        const res = await deleteDispute(deletedId)
        if (res?.success) {
            setdeleteModal(false)
            callDisputeList()
        }
        setloading(false)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIndex([]);
        }
    };


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <>
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} onClick={handleDelete} title={'Delete dispute'} details={'Do you really want to delete this dispute?'} />}
            {loading && <Loaders />}
            {viewModal && <ViewSupportModal setedit={setedit} setmodalIsopen={setmodalIsopen} seteditId={seteditId}  viewId={viewId} setviewModal={setviewModal}/>}
            {modalIsopen && <SupportModal callDisputeList={callDisputeList} setedit={setedit} seteditId={seteditId} isEdit={edit} editId={editId} setmodalIsopen={setmodalIsopen} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Support</h2>
                    </div>
                    <Button onClick={(() => setmodalIsopen(true))} styles={{
                        background: 'transparent',
                        border: '1px solid var(--primary-color)',
                        color: 'var(--primary-color)'
                    }} children={'Add new Ticket'} />
                </div>

                <div className='table_container' style={{
                    minHeight: '80vh'
                }}>
                    <table className='total_table_order_wrapper coaches_table_wrapper' >
                        <thead>
                            <tr>
                                <th>Dispute ID</th>
                                <th>Ticket Number</th>
                                <th>Date/Time</th>
                                <th>Issue Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(currentItems?.length <= 0 && !loading) && <td colSpan={12}>No dispute data found....</td>}
                            {currentItems?.map((element, i) => (
                                <>
                                    <tr>
                                        <td>#{element?.id}</td>
                                        <td>#{element?.ticket_number}</td>
                                        <td>{new Date(element?.created_at)
                                            .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: 'utc' })}</td>
                                        <td style={{
                                            textTransform: 'capitalize'
                                        }}>{element?.category}</td>
                                        <td ><p style={element?.status == 'open' ? {
                                            background: 'red',
                                            color: '#fff',
                                            width: 'fit-content',
                                            padding: '3px 5px',
                                            borderRadius: '5px',
                                            fontSize: '12px'
                                        } : {
                                            background: 'green',
                                            color: '#fff',
                                            width: 'fit-content',
                                            padding: '3px 5px',
                                            borderRadius: '5px',
                                            fontSize: '12px'
                                        }}>{element?.status}</p></td>

                                        <td ref={dropdownRef}>  <img onClick={((e) => {
                                            e.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                            {index.includes(i) && <div className='actions_wrapper' >
                                                <p onClick={(()=>{
                                                    setviewId(element?.id)
                                                    setviewModal(true)
                                                })}>View</p>
                                                <p onClick={(() => {
                                                    setedit(true)
                                                    seteditId(element?.id)
                                                    setmodalIsopen(true)
                                                })}>Edit</p>
                                                <p onClick={(() => {
                                                    setdeleteId(element?.id)
                                                    setdeleteModal(true)
                                                })}>Delete</p>
                                            </div>}</td>
                                    </tr>
                                </>
                            ))}
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

export default SupportTable
