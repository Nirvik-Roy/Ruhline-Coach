import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../../../Components/Button.jsx'
import laptopImg from '../../../../../assets/Group (2).svg'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteWheelofLifelement, getCoachProgramsStructure, getCoachSinglePrograms, getwheelofLifeElements, postwheelofLifeElements, updateWheelofLifeLifeElements } from '../../../../../utils/Program.js';
import Loaders from '../../../../../Components/Loaders/Loaders.jsx';
import AddLifeElements from '../../../../Modal/AddLifeElements.jsx';
import toast from 'react-hot-toast';
import EditlifeelmentsModal from '../../../../Modal/EditlifeelmentsModal.jsx';
import DeleteModal from '../../../../../Components/DeleteModal/DeleteModal.jsx';

const WheelOfLifeModule = () => {
    const [dropdown, setdropdown] = useState(null);
    const navigate = useNavigate()
    const [isModal, setisModal] = useState(false);
    const [editModal, seteditModal] = useState(false);
    const [deleteId, setdeletedId] = useState();
    const [deleteModal, setdeleteModal] = useState(false)
    const dropdownRef = useRef(null);
    const [singleData, setsingleData] = useState()
    const [lifeElements, setlifelements] = useState([])
    const dropdownFunction = (i) => {
        if (dropdown === i) {
            setdropdown(null)
        } else {
            setdropdown(i)
        }
    }
    const { id, moduleId } = useParams()
    const [singleProgramData, setsingleProgramData] = useState([])
    const [loading, setloading] = useState(false);

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

    const fetchData = async () => {
        try {
            setloading(true)
            const res = await getwheelofLifeElements(id, moduleId);
            console.log(res)
            setlifelements(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id && moduleId) {
            fetchData()
        }
    }, [id, moduleId])

    const addFunction = async (data, structureId, id) => {
        if (data && structureId && id) {
            try {
                setloading(true)
                const res = await postwheelofLifeElements({
                    name: data
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



    const updateLifeElements = async (data, elementId) => {
        if (data && elementId) {
            try {
                setloading(true)
                const res = await updateWheelofLifeLifeElements({
                    name: data
                }, moduleId, id, elementId);
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

    const getSingleData = (id) => {
        setsingleData(lifeElements[id])
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setsingleData({
            ...singleData,
            [name]: value
        })
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

    const deleteWord = async () => {
        if (deleteId) {
            try {
                setloading(true)
                const res = await deleteWheelofLifelement(moduleId, id, deleteId);
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
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} title={'Delete element'} details={'Do you really want to delete this life element?'} onClick={deleteWord} />}
            {isModal && <AddLifeElements setisModal={setisModal} addFunction={addFunction} />}
            {editModal && <EditlifeelmentsModal updateLifeElements={updateLifeElements} handleChange={handleChange} setsingleData={setsingleData} singleData={singleData} seteditModal={seteditModal} />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Wheel of Life</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs/create-program'))}>Program Creation</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}`))}>{singleProgramData?.name}</span>  / <span onClick={(() => navigate(`/dashboard/program/single-program//wheel-of-life/${id}/life-elements/${moduleId}`))}>Wheel of Life</span></small>
                    </div>


                    {programStructureData[0]?.can_edit && <div className='coaches_button_wapper'>


                        <div onClick={(() => setisModal(true))}>
                            <Button children={'Add life element'} styles={{
                                fontSize: '13px'
                            }} />
                        </div>
                    </div>}
                </div>

                <h3 style={{
                    fontSize: '18px',
                    color: 'var(--text-color)',
                    margin: '20px 0',
                    fontWeight: '600'
                }}>Life Elements</h3>
                {lifeElements?.length <= 0 && <p style={{
                    textAlign: 'center'
                }}>No elements found...</p>}
                <div className='coaches_shift_card_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr)'
                }}>
                    {lifeElements?.length > 0 && lifeElements?.map((e, i) => (
                        <div ref={dropdownRef} key={i} className='coaches_shift_card' style={{
                            padding: " 30px 0px",
                            background: 'rgba(144, 155, 109, 0.15)',
                            border: 'none'
                        }} onClick={((event) => {
                            event.stopPropagation()
                            dropdownFunction(i)
                        })}>
                            <img style={{
                                width: '55px'
                            }} src={laptopImg} />
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <p>{e.name}</p>

                            {dropdown == i && <div className='dropdown_wrapper662' style={{
                                bottom: '0',
                                top: '30px',
                                right: '-30px',
                                height: 'fit-content'
                            }} onClick={((e) => e.stopPropagation())}>
                                <small onClick={(() => navigate(`/dashboard/program/single-program/${id}/wheel-of-life/life-element/${moduleId}/${e?.id}`))}>View</small>
                                {programStructureData[0]?.can_edit && <>
                                    <small onClick={(() => {
                                        getSingleData(i)
                                        seteditModal(true)
                                    })}>Edit</small>
                                    <small onClick={(() => handleDelete(e?.id))}>Delete</small>
                                </>
                                }
                            </div>}
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default WheelOfLifeModule
