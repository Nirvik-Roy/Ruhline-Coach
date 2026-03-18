import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useParams } from 'react-router-dom';
const AddWordModal = ({ setisModal, addFunction }) => {
    const [wordData, setwordData] = useState('');
    const { id, moduleId } = useParams()
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add word</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={wordData} onChange={((e) => setwordData(e.target.value))} label={'Word'} required={true} placeholder={'Enter word'} />
                </div>

                <Button onClick={(() => addFunction(wordData, moduleId, id))} children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddWordModal
