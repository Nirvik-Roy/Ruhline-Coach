import React, { useEffect, useState } from 'react'
import Input from '../../Components/Input.jsx'
import Button from '../../Components/Button.jsx'
import { useParams } from 'react-router-dom'
import { editDocuments } from '../../utils/Program.js'
import toast from 'react-hot-toast'

const EditDocumentModal = ({ seteditModal, singleFile, editId, setloading, fetchDocuments }) => {
    const [docName, setdocName] = useState('')
    const { id } = useParams()
    useEffect(() => {
        setdocName(singleFile?.original_name || '')
    }, [singleFile])


    const editDocumentApi = async () => {
        if (docName != '') {
            try {
                setloading(true)
                const res = await editDocuments({
                    original_name: docName
                }, id, singleFile?.program_structure_id, editId)
                if (res?.success) {
                    seteditModal(false)
                    fetchDocuments()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Document name is required...')
        }

    }
    return (
        <>
            <div className='modal_div'>
                <h4>Edit Document</h4>
                <i onClick={(() => { seteditModal(false) })} class="fa-solid fa-xmark"></i>
                <form className='modal_form'>
                    <Input onChange={((e) => setdocName(e.target.value))} value={docName} label={'Document Name'} />
                    <div className='change_cancel_wrapper'>
                        <Button onClick={editDocumentApi} children={'Update'} />
                    </div>
                </form>

            </div>
        </>
    )
}

export default EditDocumentModal
