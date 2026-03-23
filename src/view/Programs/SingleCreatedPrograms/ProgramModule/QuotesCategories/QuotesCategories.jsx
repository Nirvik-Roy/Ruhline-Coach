import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../Components/Button.jsx';
import Pagination from '../../../../../Components/Pagination/Pagination.jsx';
import ellipse from '../../../../../assets/_MoreIcon_.svg'
import AddQutoesCategoriesModal from '../../../../Modal/AddQutoesCategoriesModal.jsx';
import toast from 'react-hot-toast';
import { getAllquoteCategory, postQuoteCategory } from '../../../../../utils/Program';
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import EditQuoteCategory from '../../../../Modal/EditQuoteCategory.jsx';
import { commonDelelteApi } from '../../../../../utils/common';
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx';

const QuotesCategories = () => {
    const [index, setIndex] = useState([]);
    const dropdownRef = useRef(null);
    const [quoteName, setquoteName] = useState()
    const [loading, setloading] = useState(false);
    const [quoteCategoryData, setquoteCategoryData] = useState([])
    const navigate = useNavigate();
    const [isModal, setisModal] = useState(false);
    const [quoteId, setquoteId] = useState();
    const [editModal, seteditModal] = useState(false);
    const [deleteId, setdeleId] = useState();
    const [deleleteModal, setdeleteModal] = useState(false)
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    const fetchQuotes = async () => {
        try {
            setloading(true)
            const res = await getAllquoteCategory()
            console.log(res);
            setquoteCategoryData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchQuotes()
    }, [])
    const postCategories = async () => {
        if (quoteName != '') {
            try {
                setloading(true);
                const res = await postQuoteCategory({
                    name: quoteName
                });
                if (res?.success) {
                    fetchQuotes()
                    setisModal(false)
                    setquoteName('')
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the filed...')
        }
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

    const deleteFunc = async () => {
        setloading(true)
        const res = await commonDelelteApi('/admin/quote-category', deleteId);
        if (res?.success) {
            setloading(false)
            setdeleteModal(false)
            fetchQuotes();

        }
    }

    const handleDelete = (id) => {
        setdeleId(id)
        setdeleteModal(true)
    }

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentItems = quoteCategoryData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(quoteCategoryData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
    return (
        <>
            {loading && <Loaders />}
            {deleleteModal && <DeleteModal details={'Do you really want to delete this category?'} title={'Delete Quote Category'} setdeleteModal={setdeleteModal} onClick={deleteFunc} />}
            {isModal && <AddQutoesCategoriesModal quoteName={quoteName} setquoteName={setquoteName} postCategories={postCategories} setisModal={setisModal} />}
            {editModal && <EditQuoteCategory fetchQuotes={fetchQuotes} quoteId={quoteId} seteditModal={seteditModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Quotes Categories</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/quote-categories'))}>Quotes Categories</span></small>

                    </div>

                    <div className='coaches_button_wapper'>

                        <div onClick={(() => setisModal(!isModal))}>
                            <Button children={'Add New Category'} styles={{
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
                                <th>Quotes Category Name</th>
                                <th>No. of quotes present</th>

                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.length <= 0 && <td colSpan={12}>No quotes categories available...</td>}
                            {currentItems?.length > 0 && currentItems?.map((e, i) => (
                                <tr>
                                    <td>
                                        {e?.name}
                                    </td>
                                    <td>{e?.quotes_count}</td>
                                    <td ref={dropdownRef}>
                                        <img onClick={((event) => {
                                            event.stopPropagation()
                                            indexFunction(i)
                                        })} src={ellipse} />
                                        {index.includes(i) && <div style={{
                                            width: '50%',
                                            left: '0'
                                        }} className='actions_wrapper'>
                                            <p onClick={(() => navigate(`/dashboard/programs/quote-categories/${e?.id}`))}>View</p>
                                            <p onClick={(() => {
                                                setquoteId(e?.id);
                                                seteditModal(true)
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

export default QuotesCategories
