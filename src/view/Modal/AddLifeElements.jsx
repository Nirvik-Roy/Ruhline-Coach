import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Input from '../../Components/Input'
import Button from '../../Components/Button'
const AddLifeElements = ({ setisModal, addFunction }) => {
    const [lifeData, setlifeData] = useState('');
    const { id, moduleId } = useParams()
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add life Elements</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>
                    <Input value={lifeData} onChange={((e) => setlifeData(e.target.value))} label={'Life element'} required={true} placeholder={'Enter life element'} />
                </div>

                <Button onClick={(() => addFunction(lifeData, moduleId, id))} children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
            </div>
        </>
    )
}

export default AddLifeElements
