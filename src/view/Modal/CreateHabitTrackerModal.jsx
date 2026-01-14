import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button.jsx'
const CreateHabitTrackerModal = ({ sethabitTracker, editFunc }) => {
    const [formValue, setformValue] = useState({
        id: '',
        habitName: '',
        limits: '',
        createdBy: 'coach',
        frequency: '',
        reminderTime: ''
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setformValue({ ...formValue, [name]: value })
    }

    const createFunc = () => {
        const { habitName, limits, createdBy, frequency, reminderTime } = formValue;
        if (habitName != '' && limits != '' && createdBy != '' && frequency != '' && reminderTime != '') {
            const copiedData = { ...formValue };
            copiedData.id = Date.now();
            editFunc(copiedData);
            sethabitTracker(false)
        }else{
            alert('plz enter all fields')
        }

    }
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
                    <Input fieldNecessary={true} onChange={onChange} name={'habitName'} label={'Habit Name'} required={true} />

                    <div className='input_form'>
                        <label>Enter frequency <span>*</span></label>
                        <div className='modal_full_day_radio_inputs_wrapper' style={{
                            marginTop: '3px',
                            paddingLeft: '6px'
                        }}>
                            <div className='modal_full_day_input_wrapper'>
                                <input required onChange={onChange} name='frequency' checked={formValue.frequency === 'Daily'} value={'Daily'} type='radio' />
                                <p>Daily</p>
                            </div>

                            <div className='modal_full_day_input_wrapper'>
                                <input required onChange={onChange} name='frequency' checked={formValue.frequency === 'Weekly'} value={'Weekly'} type='radio' />
                                <p>Weekly</p>
                            </div>

                            <div className='modal_full_day_input_wrapper'>
                                <input required onChange={onChange} name='frequency' checked={formValue.frequency === 'Monthly'} value={'Monthly'} type='radio' />
                                <p>Monthly</p>
                            </div>
                        </div>
                    </div>

                    <div className='habit_grid_wrapper'>
                        <Input fieldNecessary={true} onChange={onChange} name={'limits'} label={'Target'} required={true} />
                        <div className='input_form'>
                            <label>Combine with goal <span>*</span></label>
                            <select>
                                <option>Goal 1</option>
                            </select>
                        </div>
                        <Input fieldNecessary={true} onChange={onChange} name={'reminderTime'} label={'Reminder time'} required={true} type={'time'} />
                    </div>

                    <div onClick={(() => createFunc())} className='change_cancel_wrapper'>
                        <Button children={'Create'} />
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateHabitTrackerModal
