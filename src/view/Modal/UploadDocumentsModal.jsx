import React, {  useEffect, useState } from 'react'
import Button from '../../Components/Button'
import { Document, Page, pdfjs } from "react-pdf";
import upload from '../../assets/Vector (8).svg'
import Loaders from '../../Components/Loaders/Loaders';
import { deleteDocuments, getDocuments, postDocuments } from '../../utils/Program';
import { useParams } from 'react-router-dom';
import EditDocumentModal from './EditDocumentModal';
import DeleteModal from '../../Components/DeleteModal/DeleteModal.jsx'
pdfjs.GlobalWorkerOptions.workerSrc =
    `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const UploadDocumentsModal = ({ setuploadModal, uploadModal, documentModuleId }) => {
    const [files, setFiles] = useState([]);
    const [fileErrors, setfileErrors] = useState()
    const [editId, seteditId] = useState();
    const [singleFile, setsingleFile] = useState()
    const [editModal, seteditModal] = useState(false)
    const [loading, setloading] = useState(false)
    const [structureId, setstructureId] = useState()
    const [deleteModal, setdeleteModal] = useState(false)
    const [documentId, setdocumentId] = useState()
    const { id } = useParams()
    const openPdf = (file) => {
        const link = document.createElement("a");
        if (file instanceof File) {
            link.href = URL.createObjectURL(file);
        } else if (typeof file?.url === "string") {
            link.href = file?.url;
        } else {
            return;
        }

        link.target = "_blank"; // open in new tab
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleFile = (e) => {
        const selectedFiles = Array.from(e.target.files); // convert FileList → array
        setFiles((prev) => [...prev, ...selectedFiles]); // add to array
        e.target.value = null;
    };

    const fetchDocuments = async () => {
        try {
            setloading(true)
            const res = await getDocuments(id, documentModuleId)
            console.log(res)
            if (res?.success) {
                setFiles(res?.data?.data)
            }

        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (id && documentModuleId) {
            fetchDocuments()
        }
    }, [])
    const handleDocumentsApi = async () => {
        try {
            setloading(true)
            const formData = new FormData()
            if (files?.length == 1) {
                if (files[0] instanceof File) {
                    formData.append('file', files[0])
                }
            }

            if (files?.length > 1) {
                files.forEach((element) => {
                    if (element instanceof File) {
                        formData.append('files[]', element);
                    }
                });
            } else {
                formData.append('files', []);
            }

            const res = await postDocuments(formData, id, documentModuleId)
            if (res?.success) {
                setuploadModal(false)
                fetchDocuments()
            }
            setfileErrors(res)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (!uploadModal) {
            setFiles([])
        }
    }, [uploadModal])


    const handleSingleFile = (index) => {
        setsingleFile(files[index])
    }

    const handleDelete = (documentId, structureid) => {
        setdeleteModal(true)
        setdocumentId(documentId)
        setstructureId(structureid)
    }

    const deleteFunc = async () => {
        try {
            setloading(true)
            const res = await deleteDocuments(id, structureId, documentId)
            if (res?.success) {
                fetchDocuments()
                setdeleteModal(false)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }


    const handleLocalDelete = (index) => {
        const dummyData = [...files]
        const filteredData = dummyData.filter((e, i) => i != index)
        setFiles(filteredData)
    }
    return (
        <>
            {editModal && <EditDocumentModal fetchDocuments={fetchDocuments} setloading={setloading} editId={editId} singleFile={singleFile} seteditModal={seteditModal} />}
            {deleteModal && <DeleteModal onClick={deleteFunc} setdeleteModal={setdeleteModal} title={'Delete Document'} details={'Do you really want to delete this document?'} />}
            {loading && <Loaders />}
            <div className='modal_wrapper'></div>
            <div className='modal_div' style={(editModal || deleteModal) ? { display: 'none' } : {}}>
                <h4>Upload Documents</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setuploadModal(false))}></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>PDF supported | file size: 2MB</h5>
                            <input onChange={(e) => handleFile(e)}
                                accept='.pdf' type='file' multiple />
                        </div>
                    </div>
                    {fileErrors?.file && <small style={{
                        fontSize: '13px',
                        color: 'red'
                    }}>*{'At least one file is required'}</small>}
                    <div cla style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                        {files?.length > 0 && files?.map((file, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    cursor: 'pointer',
                                    width: '100%',
                                    maxWidth: '600px',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                                }}
                            >
                                {/* File Icon - Left */}
                                <div style={{
                                    marginRight: '12px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <i
                                        className="fa-regular fa-file-pdf"
                                        style={{
                                            fontSize: '24px',
                                            color: '#e74c3c'
                                        }}
                                    ></i>
                                </div>

                                {/* File Name - Middle with ellipsis */}
                                <div style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    marginRight: '12px'
                                }}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#333333',
                                        margin: 0,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {file?.name || file?.original_name || 'Untitled'}
                                    </p>
                                </div>

                                {/* Action Icons - Right */}
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    alignItems: 'center'
                                }}>
                                    {file?.url && <i
                                        className="fa-regular fa-pen-to-square"
                                        title="Edit"
                                        style={{
                                            fontSize: '16px',
                                            color: '#666666',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#3498db'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
                                        onClick={() => {
                                            seteditId(file?.id)
                                            seteditModal(true)
                                            handleSingleFile(index)

                                        }}
                                    ></i>}

                                    {file?.url && <i
                                        className="fa-regular fa-trash-can"
                                        title="Delete"
                                        style={{
                                            fontSize: '16px',
                                            color: '#666666',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
                                        onClick={() => {
                                            handleDelete(file?.id, file?.program_structure_id)
                                        }}
                                    ></i>}

                                    {!file?.url && <i
                                        className="fa-solid fa-x"
                                        title="Delete"
                                        style={{
                                            fontSize: '16px',
                                            color: 'red',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#e74c3c'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'red'}
                                        onClick={() => {
                                            handleLocalDelete(index)
                                        }}
                                    ></i>}

                                    <i
                                        className="fa-regular fa-eye"
                                        title="View"
                                        style={{
                                            fontSize: '16px',
                                            color: '#666666',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#27ae60'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
                                        onClick={() => openPdf(file)}
                                    ></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='change_cancel_wrapper'>
                        <Button onClick={handleDocumentsApi} children={'Upload'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default UploadDocumentsModal
