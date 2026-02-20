import React, { useState } from 'react'
import Button from '../../Components/Button'
import profile from '../../assets/User Info.png'
import ChangePasswordModal from '../Modal/ChangePasswordModal'
import UpdateBankDetails from '../Modal/UpdateBankDetails'
import { useNavigate } from 'react-router-dom'
const CoachProfile = () => {
    const [changePassword, setchangePassword] = useState(false)
    const [updateBankDetails, setupdateBankDetails] = useState(false);
    const navigate = useNavigate()
    return (
        <>
            {changePassword && <ChangePasswordModal setchangePassword={setchangePassword}/>}
            {updateBankDetails && <UpdateBankDetails setupdateBankDetails={setupdateBankDetails} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>My profile</h2>
                    </div>
                    <div className='appointments_button_wrapper'>
                        <div onClick={(()=>setupdateBankDetails(true))}>
                            <Button styles={{
                                border: '1px solid var(--primary-color)',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'var(--primary-color)'
                            }} children={'Update Bank details'} />
                        </div>


                        <div onClick={(()=>setchangePassword(true))}>
                            <Button styles={{
                                border: '1px solid var(--primary-color)',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'var(--primary-color)'
                            }} children={'Change Password'} />
                        </div>
                        <div onClick={(()=>navigate('/dashboard/edit-profile/2'))}>
                            <Button children={'Edit Profile'} />
                        </div>

                    </div>
                </div>
                <div className='coach_profile_wrapper'>
                    <div className='coach_profile_img'>
                        <img src={profile} />
                    </div>
                    <div className='coach_profile_content_wrapper'>
                        <h3>Bidisha Bhowmick</h3>
                        <div className='coach_profile_content'>
                            <div className='user_info_wrapper'>
                                <p><strong>Coach type:</strong>Yoga trainer</p>
                                <p><strong>Email:</strong>shallamb@gmail.com</p>
                                <p><strong>Phone:</strong>+1 (234) 464-0600</p>
                                <p><strong>Address:</strong>Office 149, 450 South Brand Brooklyn
                                    San Diego County, CA 91905, USA</p>
                            </div>
                            <div className='banking_details_wrapper'>
                                <h4>Banking Details</h4>
                                <p><strong>Payment Receive Mode:</strong>Bank Transfer</p>
                                <p><strong>Country:</strong>Germany</p>
                                <p><strong>Bank Name:</strong>Commerzbank</p>
                                <p><strong>Swiss Code:</strong>156d699</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoachProfile
