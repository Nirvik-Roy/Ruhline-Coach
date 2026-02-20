import Button from "../../Components/Button"
import './CoachProfile.css'
import Input from '../../Components/Input.jsx'
import upload from '../../assets/Vector (8).svg'
import { useNavigate } from "react-router-dom"
const EditCoachProfile = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Edit profile</h2>
                        <small style={{
                            cursor:'pointer'
                        }}><span onClick={(() => navigate('/dashboard/coach-profile'))}>My profile</span> / <span onClick={(() => navigate('/dashboard/edit-profile/2'))}>Edit profile</span></small>
                    </div>
                    <div className='appointments_button_wrapper'>
                        <div>
                            <Button styles={{
                                border: 'none',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'rgba(70, 35, 7, 1)',
                                backgroundColor: 'transparent',
                                fontWeight: '700'
                            }} children={'Cancel'} />
                        </div>


                        <div>
                            <Button children={'Save'} />
                        </div>


                    </div>
                </div>

                <div className="coach_form_wrapper">
                    <div className="coach_form_grid_wrapper">
                        <Input label={'First Name'} placeholder={'Enter first name'} required={true} />

                        <Input label={'Last Name'} placeholder={'Enter last name'} required={true} />

                        <Input label={'Email'} placeholder={'Enter email'} required={true} />

                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select name='phone_country_code_id' style={{
                                    border: 'none',
                                    borderRight: '2px solid #000',
                                    outline: 'none'
                                }}>
                                    {[1, 9, 23]?.map((e,) => (
                                        <option value={e} key={e}>+ {e}</option>
                                    ))}
                                </select>
                                <input name='phone' placeholder='Enter phone number' />
                            </div>
                        </div>

                        <h2 style={{
                            gridColumn: '1/-1',
                            fontSize: '22px',
                            fontWeight: '700'
                        }}>Address</h2>

                        <Input label={'Address Line 1'} placeholder={'Enter address line 1'} required={true} />

                        <Input label={'Address Line 2'} placeholder={'Enter address line 2'} required={true} />
                        <Input label={'Landmark'} placeholder={'Enter landmark'} />

                        <div className='input_form'>
                            <label>Country<span>*</span></label>
                            <select >
                                <option value=''>--Select-country--</option>
                            </select>
                        </div>

                        <div className='input_form'>
                            <label>State<span>*</span></label>
                            <select >
                                <option value=''>--Select-state--</option>
                            </select>
                        </div>


                        <div className='input_form'>
                            <label>City<span>*</span></label>
                            <select >
                                <option value=''>--Select-city--</option>
                            </select>
                        </div>

                        <Input label={'Postal Code'} placeholder={'Enter postal code'} required={true} />


                        <div className='input_form' style={{
                            gridColumn: '1/-1'
                        }}>
                            <label style={{
                                fontSize: '15px',
                                fontWeight: '600'
                            }}>Upload Image<span>*</span></label>

                            <div className='files_upload_wrapper'>
                                <>
                                    <img src={upload} />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCoachProfile
