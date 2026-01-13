import React, { Activity, useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import cross from '../../assets/content (1).svg'
const AddBreakModal = () => {
    const [toggle, setToggle] = useState()
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='modal_div'>
                <h4>Add Break / Leave</h4>
                <i class="fa-solid fa-xmark" ></i>

                <div className='modal_full_day_radio_inputs_wrapper'>
                    <div className='modal_full_day_input_wrapper'>
                        <input onClick={((e) => {
                            setToggle(e.target.value)
                        })} checked={toggle === 'Full Day' && true} value={'Full Day'} type='radio' />
                        <p>Full Day</p>
                    </div>

                    <div className='modal_full_day_input_wrapper'>
                        <input checked={toggle === 'Half Day' && true} onClick={((e) => {
                            setToggle(e.target.value)
                        })} value={'Half Day'} type='radio' />
                        <p>Half Day</p>
                    </div>

                    <div className='modal_full_day_input_wrapper'>
                        <input checked={toggle === 'Break' && true} onClick={((e) => {
                            setToggle(e.target.value)
                        })} value={'Break'} type='radio' />
                        <p>Break</p>
                    </div>
                </div>

                <Activity mode={toggle === 'Full Day' ? 'visible' : 'hidden'}>
                    <div className='date_input'>
                        <Input type={'date'} label={'Date'} required={true} />
                    </div>
                </Activity>

                <Activity mode={toggle === 'Half Day' ? 'visible' : 'hidden'}>
                    <form className='modal_form'>
                        <Input type={'date'} label={'Date'} required={true} />
                        <div className='modal_input_grid_wrapper'>
                            <Input type={'time'} label={'Start Time'} required={true} />
                            <Input type={'time'} label={'End Time'} required={true} />

                        </div>
                    </form>
                </Activity>


                <Activity mode={toggle === 'Break' ? 'visible' : 'hidden'}>
                    <form className='modal_form'>
                        <Input type={'date'} label={'Date'} required={true} />
                        <h3 style={{
                            color: 'var(--text-color)'
                        }}>Break Time</h3>

                        <div className='break_time_add_wrapper'>
                            <h3>1.</h3>
                            <div className='break_time_grid_wrapper'>
                                <Input type={'time'} label={'Start Time'} required={true} />
                                <Input type={'time'} label={'End Time'} required={true} />
                            </div>
                            <img src={cross}/>
                        </div>
                           <div className='break_time_add_wrapper'>
                            <h3>2.</h3>
                            <div className='break_time_grid_wrapper'>
                                <Input type={'time'} label={'Start Time'} required={true} />
                                <Input type={'time'} label={'End Time'} required={true} />
                            </div>
                            <img src={cross}/>
                        </div>
                        <Button children={'Add Break'} styles={{
                            background:'transparent',
                            color:'var(--text-color)',
                            border:'1px solid var(--primary-color)',
                            padding:'12px 15px',
                            fontSize:'14px'
                        }}/>
                    </form>
                </Activity>

                <div className='change_cancel_wrapper'>
                    <Button children={'Add'} />
                </div>
            </div>
        </>
    )
}

export default AddBreakModal
