import React, { Activity, useState } from 'react'
import Button from '../../../../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../../../Components/Input'
import Textarea from '../../../../Components/Textarea.jsx'
import cross from '../../../../assets/content (1).svg'
const CreateGoal = () => {
    const navigate = useNavigate()
    const [enable, setenable] = useState(true);
    const [subGoal, setsubGoal] = useState([]);
    const deleteGoal = (i) => {
        setsubGoal(prev => prev.filter((e, index) => index != i))
    }
    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Create Goal</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/goal'))} >Goal Settings</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/create-goal'))}>Create Goal</span></small>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <Link style={{
                            color: 'var(--text-color)',
                            fontWeight: '700',
                            textDecoration: 'none'
                        }}>Cancel</Link>
                        <div onClick={(()=>navigate('/dashboard/appoinments/goal/view-goal/2'))}>

                        <Button children={'Create'} />
                        </div>
                    </div>
                </div>

                <form className='create_goal_form_wrapper'>
                    <Input label={'Goal Name'} required={true} defaultValue={'Goal 1'} />
                    <div className='input_radio_buttons_wrapper'>
                        <div className='input_radio_wrapper'>
                            <input type='radio' />
                            <p>Short term</p>
                        </div>

                        <div className='input_radio_wrapper'>
                            <input type='radio' />
                            <p>Long term</p>
                        </div>
                    </div>

                    <div className='input_grid_Wrapper462'>
                        <Input type={'date'} label={'Start Date'} required={true} />
                        <div className='input_form'>
                            <label>Duration Selection <span>*</span></label>
                            <select>
                                <option>1 week</option>
                            </select>
                        </div>

                    </div>

                    <Textarea label={'Why is it important?'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '} />
                    <Textarea label={'Measurable Outcome'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '} />
                    <div className='enbale_wrapper'>
                        <p>Enable Sub Goal</p>
                        <div onClick={(() => { setenable(!enable) })} className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'} style={enable ? { background: 'var(--primary-color)' } : { background: '#293e5f' }}>
                            {enable ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i>}
                            <div className='toggle_circle' ></div>
                        </div>
                    </div>
                    {enable && <div onClick={(() => setsubGoal([...subGoal, 1]))} style={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}>
                        <Button styles={{
                            border: '1px solid var(--primary-color)',
                            background: 'transparent',
                            color: 'var(--text-color)',
                            padding: '10px 15px',
                            fontSize: '15px'
                        }} children={'Add Sub Goal'} />
                    </div>}


                    <Activity mode={subGoal.length > 0 ? 'visible' : 'hidden'}>

                        {subGoal.map((e, i) => (
                            <div className='sub_goal_wrapper'>
                                <img onClick={(() => deleteGoal(i))} src={cross} style={{
                                    position: 'absolute',
                                    top: "10px",
                                    right: '10px'
                                }} />


                                <form className='create_goal_form_wrapper'>
                                    <Input label={'Sub Goal Name'} required={true} defaultValue={'Sub Goal 1'} />
                                    <div className='input_radio_buttons_wrapper'>
                                        <div className='input_radio_wrapper'>
                                            <input type='radio' />
                                            <p>Short term</p>
                                        </div>

                                        <div className='input_radio_wrapper'>
                                            <input type='radio' />
                                            <p>Long term</p>
                                        </div>
                                    </div>

                                    <div className='input_grid_Wrapper462'>
                                        <Input type={'date'} label={'Start Date'} required={true} />
                                        <Input type={'date'} label={'End Date'} required={true} />
                                    </div>

                                    <Textarea label={'Motivation'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '} />
                                    <Textarea label={'Reward'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '} />
                                    <Textarea label={'Next Step'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '} />
                                </form>

                            </div>
                        ))}
                    </Activity>


                </form>
            </div>
        </>
    )
}

export default CreateGoal
