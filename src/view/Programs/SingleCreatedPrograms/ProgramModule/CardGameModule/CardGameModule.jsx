import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../../Components/Button'
import ellipse from '../../../../../assets/_MoreIcon_.svg'
import Pagination from '../../../../../Components/Pagination/Pagination';
import CardViewModal from '../../../../Modal/CardViewModal';
import { deleteCardGameCards, editCardGamecards, getCardGameQuestions, getCoachProgramsStructure, getCoachSinglePrograms, postCardGamecards } from '../../../../../utils/Program'
import Loaders from '../../../../../Components/Loaders/Loaders.jsx'
import AddCardModal from '../../../../Modal/AddCardModal.jsx';
import toast from 'react-hot-toast';
import CardGameCardEditModal from '../../../../Modal/CardGameCardEditModal.jsx';
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx';
const CardGameModule = () => {
    const [index, setIndex] = useState([]);
    const { id, moduleId } = useParams();
    const [singleData, setsingleData] = useState()
    const [loading, setloading] = useState(false)
    const [allQuestions, setallQuestions] = useState([]);
    const [cardDescription, setcardDescription] = useState('')
    const [cardName, setcardName] = useState('')
    const [deletedId, setdeletedId] = useState()
    const [deleteModal, setdeleteModal] = useState(false)
    const [isModal, setisModal] = useState(false)
    const [modal, setModal] = useState({
        viewCard: false,
        editCard: false
    })
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }

    const Modalfunc = (i) => {
        setModal({
            viewCard: i === 1 ? true : false,
            editCard: i === 2 ? true : false
        })
    }
    const fetchCardGameQuestions = async () => {
        try {
            setloading(true)
            const res = await getCardGameQuestions(id, moduleId)
            console.log(res)
            if (res?.success) {
                setallQuestions(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (id && moduleId) {
            fetchCardGameQuestions()

        }
    }, [id, moduleId])

    const addCardFunc = async () => {
        if (cardName != "" && cardDescription != '') {
            setloading(true)
            const res = await postCardGamecards({
                name: cardName,
                // card_category_id: cardCategoryId,
                description: cardDescription || ''
            }, id, moduleId);
            if (res?.success) {
                fetchCardGameQuestions()
                setisModal(false)
                setcardDescription("")
                setcardName("")
            }
            setloading(false)
        } else {
            toast.error("Plz enter the fields")
        }
    }

    const editCardFunc = async (singleCardId) => {
        if (cardName != '' && cardDescription != "") {
            try {
                setloading(true);
                const res = await editCardGamecards({
                    name: cardName,
                    description: cardDescription
                }, id, moduleId, singleCardId);

                if (res?.success) {
                    Modalfunc(0);
                    fetchCardGameQuestions()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the fields')
        }
    }

    const handleDelete = (id) => {
        setdeletedId(id)
        setdeleteModal(true)
    }

    const deleteFunc = async () => {
        try {
            setloading(true)
            const res = await deleteCardGameCards(id, moduleId, deletedId)
            if (res?.success) {
                fetchCardGameQuestions()
                setdeleteModal(false)
                setIndex([])
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const [singleProgramData, setsingleProgramData] = useState([])
    const fetchSingleProgram = async () => {
        try {
            setloading(true)
            const res = await getCoachSinglePrograms(id);
            setsingleProgramData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchSingleProgram()
        }
    }, [])
    const dropdownRef = useRef(null);

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

    const [programStructureData, setprogramStructureData] = useState([])
    const fetchProgramStructure = async () => {
        try {
            setloading(true);
            const res = await getCoachProgramsStructure(id)
            setprogramStructureData(res?.data?.data?.filter((e) => e?.id == moduleId))
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchProgramStructure()
    }, [])

    return (
        <>
            {deleteModal && <DeleteModal onClick={deleteFunc} title={'Delete Card'} details={'Do you really want to delete this card?'} setdeleteModal={setdeleteModal} />}
            {modal.viewCard && <CardViewModal singleData={singleData} setModal={setModal} />}
            {modal.editCard && <CardGameCardEditModal singleData={singleData} updateCardFunc={editCardFunc} cardName={cardName} setcardName={setcardName} cardDescription={cardDescription} setcardDescription={setcardDescription} modalFunc={Modalfunc} />}
            {isModal && <AddCardModal addCardFunc={addCardFunc} cardName={cardName} setcardName={setcardName} cardDescription={cardDescription} setcardDescription={setcardDescription} setisModal={setisModal} />}
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Card Game</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}`))}>{singleProgramData?.name}</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}/card-game/${moduleId}`))}>Card Game</span></small>


                    </div>

                    <div className='coaches_button_wapper'>
                        {programStructureData[0]?.can_edit && <Button onClick={(() => setisModal(true))} styles={{
                            fontSize: '13px'
                        }} children={'Add Cards'} />}
                        <div onClick={(() => navigate(`/dashboard/program/single-program/card-game/${id}/questions/${moduleId}`))}>
                            <Button children={'Questions'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Card Name</th>
                                <th>Description</th>
                                <th style={{
                                    width: '170px',
                                    minWidth: '170px',
                                    textAlign: 'center'
                                }}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allQuestions?.length <= 0 && <td style={{
                                color: 'var(--primary-color)'
                            }} colSpan={12}>No cards found...</td>}
                            {allQuestions?.length > 0 && allQuestions?.map((e, i) => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>{e?.name}</p>
                                                {/* <p>Card 1</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{e?.description}</td>
                                    <td ref={dropdownRef}>
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <img onClick={((e) => {
                                                e.stopPropagation()
                                                indexFunction(i)
                                            })} src={ellipse} />
                                            {index.includes(i) && <div className='actions_wrapper' style={{
                                                top: '20px'
                                            }}>
                                                <p onClick={(() => {
                                                    Modalfunc(1)
                                                    setsingleData(allQuestions[i])
                                                })}>View</p>
                                                <p onClick={(() => {
                                                    setsingleData(allQuestions[i])
                                                    setcardName(allQuestions[i]?.name)
                                                    setcardDescription(allQuestions[i]?.description)
                                                    Modalfunc(2)
                                                })}>Edit</p>

                                                <p onClick={(() => {
                                                    handleDelete(e?.id)
                                                })}>Delete</p>
                                            </div>}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination />
            </div>
        </>
    )
}

export default CardGameModule
