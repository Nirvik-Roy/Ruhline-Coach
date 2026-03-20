import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import laptopImg from '../../../../../assets/Group (2).svg'
import { useNavigate, useParams } from 'react-router-dom';
import AddWordModal from '../../../../Modal/AddWordModal.jsx';
import EditwordModal from '../../../../Modal/EditwordModal.jsx';
import { deleteMotivationWord, getCoachProgramsStructure, getCoachSinglePrograms, getMotivationWord, postMotivationWord, updateMotivationWord } from '../../../../../utils/Program.js';
import toast from 'react-hot-toast';
import Loaders from '../../../../../Components/Loaders/Loaders.jsx';
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx';
const FindYourMotivationModule = () => {
    const [dropdown, setdropdown] = useState(null);
    const dropdownRef = useRef(null);
    const [deleteId, setdeletedId] = useState();
    const [deleteModal, setdeleteModal] = useState(false)
    const navigate = useNavigate()
    const [isModal, setisModal] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const [wordList, setwordList] = useState([])
    const [loading, setloading] = useState(false);
    const [singleData, setsingleData] = useState()
    const { id, moduleId } = useParams()
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
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }

    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getMotivationWord(id, moduleId);
            console.log(res)
            setwordList(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const addFunction = async (data, structureId, id) => {
        if (data && structureId && id) {
            try {
                setloading(true)
                const res = await postMotivationWord({
                    word: data
                }, structureId, id);
                console.log(res)
                if (res?.success) {
                    setisModal(false)
                    fetchData()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Required data not found!')
        }
    }



    useEffect(() => {
        if (id && moduleId) {
            fetchData()
        }
    }, [id, moduleId])

    const getSingleData = (id) => {
        setsingleData(wordList[id])
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsingleData({
            ...singleData,
            [name]: value
        })
    }

    const updateWord = async (data, wordId) => {
        if (data && wordId) {
            try {
                setloading(true)
                const res = await updateMotivationWord({
                    word: data
                }, moduleId, id, wordId);
                if (res?.success) {
                    fetchData()
                    seteditModal(false)
                }
                console.log(res)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Reuired data not found!')
        }

    }


    const deleteWord = async () => {
        if (deleteId) {
            try {
                setloading(true)
                const res = await deleteMotivationWord(moduleId, id, deleteId);
                if (res?.success) {
                    setdeleteModal(false)
                    fetchData()
                    setdropdown(null)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Reuired data not found!')
        }
    }

    const handleDelete = (id) => {
        setdeletedId(id)
        setdeleteModal(true)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setdropdown(null);
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
            {loading && <Loaders />}
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} title={'Delete word'} details={'Do you really want to delete this word?'} onClick={deleteWord} />}
            {isModal && <AddWordModal addFunction={addFunction} setisModal={setisModal} />}
            {editModal && <EditwordModal updateWord={updateWord} handleChange={handleChange} setsingleData={setsingleData} singleData={singleData} seteditModal={seteditModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Find your Motivation</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}`))}>{singleProgramData?.name}</span>  / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}/motivation/${moduleId}`))}>Find your Motivation</span></small>


                    </div>

                    <div className='coaches_button_wapper'>


                        <div onClick={(() => setisModal(true))}>
                            <Button children={'Add word'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>
                </div>
                <h3 style={{
                    fontSize: '18px',
                    color: 'var(--text-color)',
                    margin: '20px 0',
                    fontWeight: '600'
                }}>Life Elements</h3>
                {wordList?.length <= 0 && <p style={{
                    textAlign: 'center'
                }}>No words found...</p>}
                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {wordList?.length > 0 && wordList?.map((e, i) => (
                        <div ref={dropdownRef} key={e} className='coaches_shift_card' style={{
                            padding: " 30px 0px",
                            background: 'rgba(144, 155, 109, 0.15)',
                            border: 'none'
                        }} onClick={((e) => {
                            e.stopPropagation()
                            dropdownFunction(i)
                        })}>
                            <img style={{
                                width: '55px'
                            }} src={laptopImg} />
                            {programStructureData[0]?.can_edit && <i class="fa-solid fa-ellipsis-vertical"></i>}
                            <p>{e?.word}</p>

                            {(dropdown == i && programStructureData[0]?.can_edit) && <div className='dropdown_wrapper662' style={{
                                bottom: '0',
                                top: '30px',
                                right: '-30px',
                                height: 'fit-content'
                            }} onClick={((e) => e.stopPropagation())}>
                                <small onClick={(() => {
                                    getSingleData(i)
                                    seteditModal(true)
                                })}>Edit</small>
                                <small onClick={(() => handleDelete(e?.id))}>Delete</small>
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default FindYourMotivationModule
