import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const AddQuoteModal = ({ setisModal, setquoteName, quoteName, addQuoteFunc }) => {
  return (
    <>
         <div className='modal_wrapper' onClick={(() => setisModal(false))}></div>
            <div className='modal_div'>
                <h4>Add Quote</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisModal(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                  <Input value={quoteName} onChange={((e) => setquoteName(e.target.value))} label={'Quote'} required={true} placeholder={'Add quote'} />
                </div>
              <div onClick={addQuoteFunc}>

                <Button children={'Add'} styles={{
                    marginLeft: 'auto'
                }} />
                 </div>
            </div>
    </>
  )
}

export default AddQuoteModal
