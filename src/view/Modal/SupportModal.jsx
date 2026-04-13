import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Textarea from '../../Components/Textarea'
import upload from '../../assets/Vector (11).svg'
import toast from 'react-hot-toast'
import { createDispute, editDispute, getDisputeformOptions, getSingleDispute } from '../../utils/dispute'
import Loaders from '../../Components/Loaders/Loaders'
const SupportModal = ({ isEdit, editId, setmodalIsopen, seteditId, setedit, callDisputeList }) => {
    const [loading, setloading] = useState(false)
    const [disputeFormOptions, setdisputeFormOptions] = useState([])
    const [programId, setprogramId] = useState();
    const [payoutId, setpayoutId] = useState();
    const [disputeError, setdisputeError] = useState([])
    const [category, setcategory] = useState('issue_with_program')
    const [imgfiles, setimgfiles] = useState([]);
    const [singleDispute, setsingleDispute] = useState([])
    const [inputData, setinputData] = useState({
        subject: '',
        description: ""
    })


    const fetchSingleDipute = async () => {
        setloading(true)
        const res = await getSingleDispute(editId)
        console.log(singleDispute)
        setsingleDispute(res)
        setloading(false)
    }

    useEffect(() => {
        if (isEdit && singleDispute) {
            setinputData({
                subject: singleDispute?.subject || '',
                description: singleDispute?.description || ''
            })
            setcategory(singleDispute?.category || "")
            setprogramId(singleDispute?.program?.id || '')
            setpayoutId(singleDispute?.payout?.id || '')
            setimgfiles(singleDispute?.attachments || [])
        }
    }, [isEdit, singleDispute])

    useEffect(() => {
        if (isEdit && editId) {
            fetchSingleDipute()
        }
    }, [isEdit, editId])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputData({
            ...inputData,
            [name]: value
        })
    }
    const handleDelete = (index) => {
        setimgfiles((prev) => (
            prev.filter((e, i) => i != index)
        ))
    }
    const handleUpload = (e) => {
        const files = e.target.files;
        if (files.length > 5) {
            toast.error("Max 5 files allowed");
            e.target.value = null; // reset input
            return;
        }
        if (imgfiles?.length == 5) {
            toast.error("Max 5 files can be uploaded")
        } else {
            setimgfiles([...imgfiles, ...files])
        }
        e.target.value = null
    }

    const callDisputeOptions = async () => {
        setloading(true)
        const res = await getDisputeformOptions()
        setdisputeFormOptions(res)
        setloading(false)
    }
    useEffect(() => {
        callDisputeOptions()
    }, [])


    const createDisputeFunc = async () => {
        setloading(true)
        const formData = new FormData();
        formData.append('subject', inputData?.subject)
        formData.append('category', category)
        if (category == 'issue_with_program') {
            formData.append('program_id', programId)
        }
        if (category == 'issue_with_payments') {
            formData.append('payout_id', payoutId)
        }
        formData.append('description', inputData.description)
        if (imgfiles?.length > 0) {
            imgfiles?.forEach((element, index) => {
                formData.append(`attachments[${index}]`, element)
            })
        }
        const res = await createDispute(formData)
        if (res?.success) {
            setmodalIsopen(false)
            seteditId(null)
            setmodalIsopen(false)
            callDisputeList()
        }
        setdisputeError(res?.errors || null)
        setloading(false)
    }


    const editDisputeFunc = async () => {
        setloading(true)
        const formData = new FormData();
        formData.append('subject', inputData?.subject)
        formData.append('category', category)
        if (category == 'issue_with_program') {
            formData.append('program_id', programId)
        }
        if (category == 'issue_with_payments') {
            formData.append('payout_id', payoutId)
        }
        formData.append('description', inputData.description)
        if (imgfiles?.length > 0) {
            imgfiles?.forEach((element, index) => {
                if (element instanceof File) {
                    formData.append(`attachments[${index}]`, element)
                }
            })
        }
        const res = await editDispute(formData, editId)
        if (res?.success) {
            setmodalIsopen(false)
            seteditId(null)
            setedit(false)
            callDisputeList()
        }
        setdisputeError(res?.errors || null)
        setloading(false)
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => {
                setedit(false)
                seteditId(null)
                setmodalIsopen(false)
            })}></div>
            <div className='modal_div'>
                <h4>{isEdit ? 'Edit' : 'Add'} new Ticket</h4>
                <i class="fa-solid fa-xmark" onClick={(() => {
                    setedit(false)
                    seteditId(null)
                    setmodalIsopen(false)
                })}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input label={'Subject'} value={inputData.subject} onChange={handleChange} name={'subject'} required={true} placeholder={'Enter subject'} />

                    {disputeError?.subject && <small style={{
                        color: 'red',
                        marginLeft: '5px',
                        marginTop: '-10px'
                    }}>* {disputeError?.subject[0]}</small>}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <input style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--primary-color)'
                            }} type='radio' checked={category == 'issue_with_program'} value={'issue_with_program'} onClick={(() => setcategory('issue_with_program'))} />
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--text-color)'
                            }}>Issue with program</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <input style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--primary-color)'
                            }} type='radio' checked={category == 'issue_with_payments'} value={'issue_with_payments'} onClick={(() => setcategory('issue_with_payments'))} />
                            <p style={{
                                fontSize: '15px',
                                color: 'var(--text-color)'
                            }}>Issue with payments</p>
                        </div>
                    </div>


                    {category == 'issue_with_program' && <div className='input_form'>
                        <label>Select program <span>*</span></label>
                        <select value={programId} onChange={((e) => setprogramId(Number(e?.target.value)))}>
                            <option value={''}>--select-program--</option>
                            {disputeFormOptions?.programs?.map((element) => (
                                <option value={element?.id} key={element?.id}>{element?.name}</option>
                            ))}
                        </select>
                    </div>}


                    {(disputeError?.program_id && category == 'issue_with_program') && <small style={{
                        color: 'red',
                        marginLeft: '5px',
                        marginTop: '-10px'
                    }}>* {disputeError?.program_id[0]}</small>}
                    {category == 'issue_with_payments' && <div className='input_form'>
                        <label>Select transaction <span>*</span></label>
                        <select value={payoutId} onChange={((e) => setpayoutId(Number(e?.target.value)))}>
                            <option value={''}>--select-program--</option>
                            {disputeFormOptions?.payouts
                                ?.map((element) => (
                                    <option value={element?.id} key={element?.id}>#{element?.checkout_order_id}</option>
                                ))}
                        </select>
                    </div>}

                    {(disputeError?.payout_id && category == 'issue_with_payments') && <small style={{
                        color: 'red',
                        marginLeft: '5px',
                        marginTop: '-10px'
                    }}>* {disputeError?.payout_id[0]}</small>}

                    <Textarea placeholder={'Enter description'} name={'description'} value={inputData.description} onChange={handleChange} label={'Description'} required={true} styles={{
                        height: '150px'
                    }} />

                    {disputeError?.description && <small style={{
                        color: 'red',
                        marginLeft: '5px',
                        marginTop: '-10px'
                    }}>* {disputeError?.description[0]}</small>}

                    <div className='input_form' style={{ gridColumn: '1/-1' }}>
                        <label style={{ fontSize: '15px', fontWeight: '400' }}>Upload Image</label>
                        <div
                            className='files_upload_wrapper'
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                multiple maxLength={5} max={5}
                                onChange={handleUpload}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                            />
                            <img src={upload} alt="" />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'relative',
                            marginTop: '10px'
                        }}>

                            {imgfiles?.map((e, index) => {
                                if (e instanceof File) {
                                    return (
                                        <>

                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <i onClick={(() => handleDelete(index))} style={{
                                                    fontSize: '14px',
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    left: '70px',
                                                    cursor: 'pointer',
                                                    color: 'var(--primary-color)'
                                                }} class="fa-solid fa-circle-xmark"></i>
                                                <img

                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        borderRadius: '5px',
                                                        objectFit: 'cover'
                                                    }}
                                                    key={index}
                                                    src={URL.createObjectURL(e)}
                                                    alt="preview"
                                                />
                                            </div>

                                        </>

                                    );
                                } else {
                                    return (
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <i onClick={(() => handleDelete(index))} style={{
                                                fontSize: '14px',
                                                position: 'absolute',
                                                top: '-10px',
                                                left: '70px',
                                                cursor: 'pointer',
                                                color: 'var(--primary-color)'
                                            }} class="fa-solid fa-circle-xmark"></i>

                                            <img key={index} alt="preview" style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '5px',
                                                objectFit: 'cover'
                                            }} src={e.url} />


                                            {(disputeError?.attachments)
                                                && <small style={{
                                                    color: 'red',
                                                    marginLeft: '5px',
                                                }}>* {disputeError?.attachments}</small>}
                                        </div>
                                    )

                                }
                            })}
                        </div>
                    </div>
                </div>

                <Button onClick={isEdit ? editDisputeFunc : createDisputeFunc} children={isEdit ? 'Update' : 'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default SupportModal
