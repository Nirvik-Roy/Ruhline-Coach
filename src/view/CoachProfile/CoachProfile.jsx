import React, { useState, useEffect, Activity } from 'react'
import Button from '../../Components/Button'
import defaultProfileImg from '../../assets/User Info.png'
import ChangePasswordModal from '../Modal/ChangePasswordModal'
import UpdateBankDetails from '../Modal/UpdateBankDetails'
import { useNavigate } from 'react-router-dom'
import { getCoachProfile } from '../../Services/GetCoachProfile'
import Loaders from '../../Components/Loaders/Loaders'
import { getBankDetails } from '../../Services/bankdetails'
const CoachProfile = () => {
    const [changePassword, setchangePassword] = useState(false)
    const [updateBankDetails, setupdateBankDetails] = useState(false);
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null);
    const [bankDetails, setbankdetails] = useState({})
    const [loaders, setloaders] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchBankDetails = async () => {
        try {
            setloaders(true)
            const res = await getBankDetails()
            if (res?.success) {
                setbankdetails(res?.data?.payment_details)
            }
        } catch (err) {
            console.log(err)
            setProfile(null)
        } finally {
            setloaders(false)
        }
    }
    const fetchProfile = async () => {
        try {
            const res = await getCoachProfile()
            setProfile(res?.data?.user ?? null)
        } catch (err) {
            console.log(err)
            setProfile(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchBankDetails()
        fetchProfile()
    }, [])
    if (loading) {
        return (
            <div className='dashboard_container'>
                <p>Loading profile...</p>
            </div>
        )
    }
    if (!profile) {
        return (
            <div className='dashboard_container'>
                <p>Unable to load profile.</p>
            </div>
        )
    }



    return (
        <>
            {loaders && <Loaders />}
            {changePassword && <ChangePasswordModal setchangePassword={setchangePassword} />}
            {updateBankDetails && <UpdateBankDetails bankDetails={bankDetails} setupdateBankDetails={setupdateBankDetails} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>My profile</h2>
                    </div>
                    <div className='appointments_button_wrapper'>
                        <div onClick={(() => {
                            fetchBankDetails()
                            setupdateBankDetails(true)
                        })}>
                            <Button styles={{
                                border: '1px solid var(--primary-color)',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'var(--primary-color)'
                            }} children={'Update Bank details'} />
                        </div>


                        <div onClick={(() => setchangePassword(true))}>
                            <Button styles={{
                                border: '1px solid var(--primary-color)',
                                borderRadius: '8px',
                                background: 'transparent',
                                color: 'var(--primary-color)'
                            }} children={'Change Password'} />
                        </div>
                        <div onClick={(() => navigate('/dashboard/edit-profile/2'))}>
                            <Button children={'Edit Profile'} />
                        </div>

                    </div>
                </div>
                <div className='coach_profile_wrapper'>
                    <div className='coach_profile_img'>
                        <img src={profile.profile?.profile_image || defaultProfileImg} alt="Profile" />
                    </div>
                    <div className='coach_profile_content_wrapper'>
                        <h3>{profile.first_name} {profile.last_name}</h3>
                        <div className='coach_profile_content'>
                            <div className='user_info_wrapper'>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Phone:</strong> {profile.profile?.phone_country_code?.dial_code ? `+${profile.profile.phone_country_code.dial_code} ` : ''}{profile.profile?.phone ?? profile.phone}</p>
                                <p><strong>Address:</strong> {[
                                    profile.profile?.address_line_1,
                                    profile.profile?.address_line_2,
                                    profile.profile?.landmark,
                                    profile.profile?.city?.name ?? profile.profile?.city_id,
                                    profile.profile?.state?.name ?? profile.profile?.state_id,
                                    profile.profile?.country?.name ?? profile.profile?.country_id,
                                    profile.profile?.postal_code
                                ].filter(Boolean).join(', ') || '—'}</p>
                            </div>
                            {(bankDetails?.country != '' && bankDetails?.bank_name != '' && bankDetails?.swiss_code != '' && bankDetails?.account_holder_name != '') && <div className='banking_details_wrapper'>
                                <h4>Banking Details</h4>
                                <p><strong>Payment Receive Mode:</strong> Bank Transfer</p>
                             
                                {bankDetails?.account_holder_name && <p> <strong>
                                    Account Holder Name:
                                </strong> {bankDetails?.account_holder_name}</p>}
                                {bankDetails?.account_number && <p> <strong>
                                    Account Holder Name:
                                </strong> {bankDetails?.account_number}</p>}
                                {bankDetails?.country && <p><strong>Country: </strong>{bankDetails?.country}</p>}
                                {bankDetails?.bank_name && <p><strong>Bank Name: </strong>{bankDetails?.bank_name}</p>}
                                {bankDetails?.swiss_code && <p><strong>Swiss Code: </strong>{bankDetails?.swiss_code}</p>}
                               
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoachProfile
