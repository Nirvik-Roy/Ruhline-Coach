import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import Textarea from '../../Components/Textarea'
const AddCardModal = ({ setisModal, cardDescription, setcardDescription, cardName, setcardName, addCardFunc }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add card</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px'
                }}>

                    <Input value={cardName} onChange={((e) => setcardName(e.target.value))} label={'Card Name'} required={true} placeholder={'Enter card name'} />
                    <Textarea value={cardDescription} onChange={((e) => setcardDescription(e.target.value))} label={'Description'} required={true} placeholder={'Enter card description '} />
                </div>
                <div onClick={addCardFunc}>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
                </div>
            </div>
        </>
    )
}

export default AddCardModal
