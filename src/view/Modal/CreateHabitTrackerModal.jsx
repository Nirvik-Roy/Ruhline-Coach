import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button.jsx'
const CreateHabitTrackerModal = ({ sethabitTracker }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => sethabitTracker(false))}></div>
            <div className='modal_div'>
                <h4>Create Habit</h4>
                <i class="fa-solid fa-xmark" onClick={(() => sethabitTracker(false))}></i>
                <form className='modal_form'>
                    <div className='input_form'>
                        <label>Select Habit type <span>*</span></label>
                        <select>
                            <option>Habit type 1</option>
                        </select>
                    </div>
                    <Input label={'Habit Name'} required={true} defaultValue={'Habit 1'} />

                    <div className='input_form'>
                        <label>Enter frequency <span>*</span></label>
                        <div className='modal_full_day_radio_inputs_wrapper' style={{
                            marginTop: '3px',
                            paddingLeft: '6px'
                        }}>
                            <div className='modal_full_day_input_wrapper'>
                                <input value={'Daily'} type='radio' />
                                <p>Daily</p>
                            </div>

                            <div className='modal_full_day_input_wrapper'>
                                <input value={'Weekly'} type='radio' />
                                <p>Weekly</p>
                            </div>

                            <div className='modal_full_day_input_wrapper'>
                                <input value={'Monthly'} type='radio' />
                                <p>Monthly</p>
                            </div>
                        </div>
                    </div>

                    <div className='habit_grid_wrapper'>
                        <Input label={'Target'} required={true} defaultValue={'20'} />
                        <div className='input_form'>
                            <label>Combine with goal <span>*</span></label>
                            <select>
                                <option>Goal 1</option>
                            </select>
                        </div>
                        <Input label={'Reminder time'} required={true} type={'time'} />
                    </div>

                    <div className='change_cancel_wrapper'>
                        <Button children={'Create'} />
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateHabitTrackerModal
