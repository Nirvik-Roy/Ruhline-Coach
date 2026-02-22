import React, { useState } from 'react'
import eye from '../../assets/Union (1).svg'
import tick from '../../assets/Union (2).svg'
import Button from '../../Components/Button'
import { changePassword } from '../../Services/ChangePassword'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AuthlogOut } from '../../Store/Slices/Loginslice/AuthSlice'
import Loaders from '../../Components/Loaders/Loaders'

const ChangePasswordModal = ({ setchangePassword }) => {
    const [current_password, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [type, setType] = useState(true)
    const [type2, setType2] = useState(true)
    const [type3, seType3] = useState(true)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (loading) return
        setError('')
        if (!current_password || !password || !password_confirmation) {
            setError('All fields are required')
            return
        }
        if (password !== password_confirmation) {
            setError('New password and confirmation do not match')
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }
        setLoading(true)
        try {
            const res = await changePassword({ current_password, password, password_confirmation })
            setchangePassword(false)
            console.log(res)
            if (res?.success) {
                toast.success('Password changed succefully')
                dispatch(AuthlogOut())
            }
        } catch (err) {
            setError(err.message || 'Failed to change password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper' onClick={() => setchangePassword(false)}></div>
            <div className='modal_div'>
                <h4>Change Password</h4>
                <i className="fa-solid fa-xmark" onClick={() => setchangePassword(false)}></i>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <div className='input_form' style={{ position: 'relative' }}>
                        <label>Current Password <span>*</span></label>
                        <input
                            name='current_password'
                            value={current_password}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ padding: '0 40px 0 15px' }}
                            type={!type ? 'text' : 'password'}
                            placeholder='*********'
                            autoComplete='current-password'
                        />
                        {type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye-slash" onClick={(() => setType(!type))}></i>}
                        {!type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye" onClick={(() => setType(!type))}></i>}
                    </div>
                    <div className='input_form' style={{ position: 'relative' }}>
                        <label>New Password <span>*</span></label>
                        <input
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '0 40px 0 15px' }}
                            type={!type2 ? 'text' : 'password'}
                            placeholder='*********'
                            autoComplete='new-password'
                        />
                        {type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye-slash" onClick={(() => setType2(!type2))}></i>}
                        {!type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye" onClick={(() => setType2(!type2))}></i>}
                    </div>
                    <div className='input_form' style={{ position: 'relative' }}>
                        <label>Confirm Password <span>*</span></label>
                        <input
                            name='password_confirmation'
                            value={password_confirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            style={{ padding: '0 40px 0 15px' }}
                            type={!type3 ? 'text' : 'password'}
                            placeholder='*********'
                            autoComplete='new-password'
                        />
                        {type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye-slash" onClick={(() => seType3(!type3))}></i>}
                        {!type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} className="fa-regular fa-eye" onClick={(() => seType3(!type3))}></i>}
                        {/* <img style={{ position: 'absolute', top: '50px', right: '40px', width: '15px', cursor: 'pointer' }} src={tick} alt="" /> */}
                        <small style={{ fontSize: '12px', marginLeft: '10px' }}>8+ characters</small>
                    </div>
                    {error && <small style={{ color: 'red', display: 'block', marginBottom: '8px' }}>{error}</small>}
                    <div className='change_cancel_wrapper'>
                        <Button
                            children={loading ? 'Changing...' : 'Change'}
                            onClick={(e) => { e.preventDefault(); handleSubmit(e); }}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePasswordModal
