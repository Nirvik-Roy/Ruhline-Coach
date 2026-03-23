
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../../Components/Button.jsx';
import Pagination from '../../../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../../../assets/_MoreIcon_.svg'
import AddQuoteModal from '../../../../Modal/AddQuoteModal.jsx';
import { getAllQuotes, getSingleQuoteCategory, postQuote } from '../../../../../utils/Program';
import Loaders from '../../../../../Components/Loaders/Loaders.jsx';
import toast from 'react-hot-toast';
import EditQuoteModal from '../../../../Modal/EditQuoteModal.jsx';
import { commonDelelteApi } from '../../../../../utils/common';
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx';
const SingleQutoesCategories = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate();
    const [isModal, setisModal] = useState(false);
    const [loading, setloading] = useState(false)
    const [allQuotesData, setallQuotesData] = useState([]);
    const [isEditModal, setisEditModal] = useState(false)
    const [quoteId, setquoteId] = useState()
    const [quoteName, setquoteName] = useState('')
    const dropdownRef = useRef(null);
    const [singleQuoteData, setsingleQuoteData] = useState({})
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
    const { id } = useParams()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const fetchQuotes = async () => {
        setloading(true)
        const res = await getAllQuotes(id);
        if (res?.success) {
            setallQuotesData(res?.data?.data)
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


    const fetchSingleQuoteCategory = async () => {
        setloading(true)
        const res = await getSingleQuoteCategory(id);
        if (res?.success) {
            setsingleQuoteData(res?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        fetchQuotes()
        fetchSingleQuoteCategory()
    }, [id])

    const addQuoteFunc = async () => {
        if (quoteName != "") {
            setloading(true)
            const res = await postQuote({
                quote: quoteName,
                quote_category_id: id
            });
            if (res?.success) {
                fetchQuotes()
                fetchSingleQuoteCategory()
                setisModal(false)
            }
            setloading(false)
        } else {
            toast.error("Plz enter the field")
        }
    }
    const deleteFunc = async () => {
        setloading(true)
        const res = await commonDelelteApi('/admin/quote-category/quotes', deleteId);
        if (res?.success) {
            setloading(false)
            setdeleteModal(false)
            fetchQuotes();
        }
        setloading(false)
    }

    const handleDelete = (id) => {
        setdeleId(id)
        setdeleteModal(true)
    }
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentItems = allQuotesData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allQuotesData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
    return (
        <>
            {isModal && <AddQuoteModal addQuoteFunc={addQuoteFunc} quoteName={quoteName} setquoteName={setquoteName} setisModal={setisModal} />}
            {deleleteModal && <DeleteModal details={'Do you really want to delete this quote?'} title={'Delete Quote'} setdeleteModal={setdeleteModal} onClick={deleteFunc} />}
            {isEditModal && <EditQuoteModal fetchQuotes={fetchQuotes} quoteId={quoteId} setisEditModal={setisEditModal} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>{singleQuoteData?.name}</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/quote-categories'))}>Quotes Categories</span> / <span onClick={(() => navigate(`/dashboard/programs/quote-categories/${id}`))}>{singleQuoteData?.name}</span></small>
                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add Quote'} styles={{
                                fontSize: '13px',
                                padding: '15px 15px',
                            }} />
                        </div>

                        <div className='coaches_search_wrapper'>
                            <input placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Quotes list</th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length <= 0 && <td colSpan={12}>No quotes available</td>}
                            {currentItems.length > 0 && currentItems?.map((e, i) => (
                                <tr>
                                    <td>{e?.quote}</td>
                                    <td ref={dropdownRef} style={{
                                        position: 'relative'
                                    }}>
                                        <img onClick={((event) => {
                                            event.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper' style={{
                                            width: 'fit-content',
                                            right: '-50px',
                                            left: '0px',
                                            bottom: '-80px'
                                        }}>
                                            <p onClick={(() => {
                                                setisEditModal(true)
                                                setquoteId(e?.id)
                                            })}>Edit</p>
                                            <p onClick={(() => handleDelete(e?.id))}>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
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

export default SingleQutoesCategories
