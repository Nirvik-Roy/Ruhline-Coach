import React, { useEffect, useState } from 'react'
import { editQuote, getSingleQuote } from '../../utils/Program';
import Loaders from '../../Components/Loaders/Loaders';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import toast from 'react-hot-toast';

const EditQuoteModal = ({ setisEditModal, quoteId, fetchQuotes }) => {
    const [loading, setloading] = useState(false);
    const [quoteName, setquoteName] = useState();
    const [singleQuote, setsingleQuote] = useState()
    const fetchSingleQuote = async () => {
        try {
            setloading(true);
            const res = await getSingleQuote(quoteId)
            setsingleQuote(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchSingleQuote()
    }, [])

    useEffect(() => {
        setquoteName(singleQuote?.quote)
    }, [singleQuote])
    console.log(singleQuote)
    const editQuoteModal = async () => {
        if (quoteName != '') {
            try {
                setloading(true);
                const res = await editQuote({
                    quote: quoteName,
                    quote_category_id: singleQuote?.quote_category?.id
                }, quoteId);
                if (res?.success) {
                    setisEditModal(false);
                    fetchQuotes()
                }
            } catch (err) {
                console.log(err)
            } finally {
                setloading(false)
            }
        } else {
            toast.error('Plz enter the field')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={(() => setisEditModal(false))}></div>
            <div className='modal_div'>
                <h4>Edit Quote</h4>
                <i class="fa-solid fa-xmark" onClick={(() => setisEditModal(false))}></i>
                <div style={{
                    margin: '25px 0'
                }}>
                    <Input value={quoteName} onChange={((e) => setquoteName(e.target.value))} label={'Quote'} required={true} placeholder={'Add quote'} />
                </div>
                <div onClick={editQuoteModal}>
                    <Button children={'Edit'} styles={{
                        marginLeft: 'auto'
                    }} />
                </div>
            </div>
        </>
    )
}

export default EditQuoteModal
