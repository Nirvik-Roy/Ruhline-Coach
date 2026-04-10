import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { updateBankDetailsApi } from '../../Services/bankdetails'
import Loaders from '../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
const   UpdateBankDetails = ({ setupdateBankDetails, bankDetails }) => {
    const [loading,setloading] = useState(false)
    const [inputData, setInputData] = useState({
        account_number: "",
        country: '',
        bank_name: '',
        account_holder_name: '',
        swiss_code: ''
    })

    useEffect(() => {
        setInputData({
            account_number: bankDetails?.account_number || '',
            country: bankDetails?.country || '',
            bank_name: bankDetails?.bank_name || '',
            account_holder_name: bankDetails?.account_holder_name,
            swiss_code: bankDetails?.swiss_code
        })
    }, [bankDetails])

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const postBankDetailsFunc = async () => {
        if(inputData?.account_number !='' && inputData?.country !="" && inputData?.bank_name != '' && inputData?.account_holder_name!='' && inputData?.swiss_code!=''){
            try {
                setloading(true)
                const res = await updateBankDetailsApi(inputData)
                if (res?.success) {
                    setupdateBankDetails(false)
                }
            } catch (err) {
                setloading(false)
                console.log(err)
            } finally {
                setloading(false)
            }
        }else{
            toast.error('Plz fill all the required fileds...')
        }
      
    }
    return (
        <>
            {loading && <Loaders/>}
            <div className='modal_wrapper' onClick={(() => setupdateBankDetails(false))}></div>
            <div className='modal_div'>
                <h4>Update Bank details</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setupdateBankDetails(false))}></i>
                <div className='modal_form'>
                    <Input value={inputData?.account_number} onChange={handleChange} label={'Account Number'} required={true} name={'account_number'} placeholder={'Enter account number'} />

                    <Input label={'Country Name'} onChange={handleChange} value={inputData?.country} required={true} name={'country'} placeholder={'Enter country name'} />

                    <Input label={'Bank Name'} onChange={handleChange} value={inputData?.bank_name} required={true} name={'bank_name'} placeholder={'Enter bank name'} />

                    <Input onChange={handleChange} value={inputData?.account_holder_name} label={'Account Holder Name'} required={true} name={'account_holder_name'} placeholder={'Enter account holder name'} />
                    <Input onChange={handleChange} value={inputData?.swiss_code} label={'Swiss Code'} required={true} name={'swiss_code'} placeholder={'Enter swiss code'} />
                </div>
                <div onClick={postBankDetailsFunc} className='change_cancel_wrapper'>
                    <Button children={'Update'} />
                </div>
            </div>
        </>
    )
}

export default UpdateBankDetails
