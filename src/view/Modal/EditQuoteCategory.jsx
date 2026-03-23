import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loaders from '../../Components/Loaders/Loaders';
import { editQuoteCategory, getSingleQuoteCategory } from '../../utils/Program';
import  Input  from '../../Components/Input.jsx';
import Button from '../../Components/Button';

const EditQuoteCategory = ({ seteditModal, quoteId, fetchQuotes }) => {
    const [quoteName, setquoteName] = useState();
    const [singleQuote, setsingleQuote] = useState([])
    const [loading, setloading] = useState(false);
    const editCategories = async () => {
        if (quoteName != '') {
            try {
                setloading(true);
                const res = await editQuoteCategory({
                    name: quoteName
                }, quoteId);
                if (res?.success) {
                    fetchQuotes();
                    seteditModal(false)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field...')
        }
    }

    const fetchSingleQuote = async () => {
        if (quoteId) {
            try {
                setloading(true);
                const res = await getSingleQuoteCategory(quoteId);
                setsingleQuote(res?.data)
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        }
    }

    useEffect(() => {
        fetchSingleQuote()
    }, [])

    useEffect(()=>{
      setquoteName(singleQuote?.name)
    },[singleQuote])
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => seteditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit Quotes Category</h4>
                <i class="fa-solid fa-xmark" onClick={(() => seteditModal(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input value={quoteName} onChange={((e) => setquoteName(e.target.value))} label={'Quotes Category Name'} required={true} placeholder={'Enter category name'} />
                </div>
                <div onClick={editCategories}>
                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditQuoteCategory
