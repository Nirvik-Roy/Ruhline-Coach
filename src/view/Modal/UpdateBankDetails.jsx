import React from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
const UpdateBankDetails = ({ setupdateBankDetails }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => setupdateBankDetails(false))}></div>
            <div className='modal_div'>
                <h4>Update Bank details</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setupdateBankDetails(false))}></i>
                <div className='modal_form'>
                    <div className='input_form'>
                        <label>Select Country<span>*</span></label>
                        <select >
                            <option value=''>--Select-country--</option>
                        </select>
                    </div>

                    <div className='input_form'>
                        <label>Bank Name<span>*</span></label>
                        <select >
                            <option value=''>--Select-bank-name--</option>
                        </select>
                    </div>

                    <Input label={'Account Holder Name'} required={true} name={'account_holder'} placeholder={'Enter account holder name'} />

                    <Input label={'Swiss Code'} required={true} name={'swiss_code'} placeholder={'Enter swiss code'} />
                </div>
                <div className='change_cancel_wrapper'>
                    <Button children={'Update'} />
                </div>
            </div>
        </>
    )
}

export default UpdateBankDetails
