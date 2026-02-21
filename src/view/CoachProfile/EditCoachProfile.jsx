import { useState, useRef, useEffect } from "react"
import Button from "../../Components/Button"
import './CoachProfile.css'
import Input from '../../Components/Input.jsx'
import upload from '../../assets/Vector (8).svg'
import { useNavigate, useParams } from "react-router-dom"
import { updateCoachProfile } from '../../Services/UpdateCoachProfile'
import { getCoachProfile } from '../../Services/GetCoachProfile'
import { useCountries, useStates, useCities, usePhoneCountryCodes } from '../../hooks/Location'


const emptyForm = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_country_code_id: '1',
    address_line_1: '',
    address_line_2: '',
    landmark: '',
    country_id: '',
    state_id: '',
    city_id: '',
    postal_code: ''
}

const EditCoachProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const fileInputRef = useRef(null)

    const [form, setForm] = useState(emptyForm)
    const [profileImage, setProfileImage] = useState(null)

    const { countries, loading: countriesLoading } = useCountries()
    const countryId = form.country_id ? Number(form.country_id) || form.country_id : null
    const { states, loading: statesLoading } = useStates(countryId)
    const stateId = form.state_id ? Number(form.state_id) || form.state_id : null
    const { cities, loading: citiesLoading } = useCities(stateId)
    const { phoneCodes, loading: phoneCodesLoading } = usePhoneCountryCodes()

    const [existingProfileImageUrl, setExistingProfileImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!id) {
            setFetchLoading(false)
            return
        }
        let cancelled = false
        const fetchProfile = async () => {
            setFetchLoading(true)
            setError('')
            try {
                const res = await getCoachProfile()
                const payload = res?.data ?? res
                const user = payload?.user
                if (cancelled || !user) return
                const profile = user.profile ?? {}
                const countryId = profile.country?.id ?? profile.country_id
                const stateId = profile.state?.id ?? profile.state_id
                const cityId = profile.city?.id ?? profile.city_id
                const phoneCodeId = profile.phone_country_code?.id ?? profile.phone_country_code_id
                setForm({
                    first_name: user.first_name ?? '',
                    last_name: user.last_name ?? '',
                    email: user.email ?? '',
                    phone: profile.phone ?? '',
                    phone_country_code_id: phoneCodeId != null ? String(phoneCodeId) : '1',
                    address_line_1: profile.address_line_1 ?? '',
                    address_line_2: profile.address_line_2 ?? '',
                    landmark: profile.landmark ?? '',
                    country_id: countryId != null ? String(countryId) : '',
                    state_id: stateId != null ? String(stateId) : '',
                    city_id: cityId != null ? String(cityId) : '',
                    postal_code: profile.postal_code ?? ''
                })
                if (profile.profile_image) setExistingProfileImageUrl(profile.profile_image)
            } catch (err) {
                if (!cancelled) setError(err.message || 'Failed to load profile')
            } finally {
                if (!cancelled) setFetchLoading(false)
            }
        }
        fetchProfile()
        return () => { cancelled = true }
    }, [id])

    const updateField = (name, value) => {
        setForm(prev => {
            const next = { ...prev, [name]: value }
            if (name === 'country_id') {
                next.state_id = ''
                next.city_id = ''
            } else if (name === 'state_id') {
                next.city_id = ''
            }
            return next
        })
    }

    const handleSave = async (e) => {
        e?.preventDefault()
        if (loading) return
        setError('')
        const fd = new FormData()
        
        fd.append('first_name', form.first_name)
        fd.append('last_name', form.last_name)
        fd.append('email', form.email)
        fd.append('phone', form.phone)
        fd.append('phone_country_code_id', form.phone_country_code_id)
        fd.append('address_line_1', form.address_line_1)
        fd.append('address_line_2', form.address_line_2)
        fd.append('landmark', form.landmark)
        fd.append('country_id', form.country_id)
        fd.append('state_id', form.state_id)
        fd.append('city_id', form.city_id)
        fd.append('postal_code', form.postal_code)
        if (profileImage) fd.append('profile_image', profileImage)

        setLoading(true)
        try {
            await updateCoachProfile(fd)
            navigate('/dashboard/coach-profile')
        } catch (err) {
            setError(err.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) setProfileImage(file)
    }

    const onDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) setProfileImage(file)
    }

    const onDragOver = (e) => e.preventDefault()

    return (
        <>
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Edit profile</h2>
                        <small style={{ cursor: 'pointer' }}>
                            <span onClick={() => navigate('/dashboard/coach-profile')}>My profile</span>
                            {' / '}
                            <span onClick={() => id && navigate(`/dashboard/edit-profile/${id}`)}>Edit profile</span>
                        </small>
                    </div>
                    <div className='appointments_button_wrapper'>
                        <div>
                            <Button
                                styles={{
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: 'transparent',
                                    color: 'rgba(70, 35, 7, 1)',
                                    backgroundColor: 'transparent',
                                    fontWeight: '700'
                                }}
                                children={'Cancel'}
                                onClick={() => navigate('/dashboard/coach-profile')}
                            />
                        </div>
                        <div>
                            <Button children={loading ? 'Saving...' : 'Save'} onClick={handleSave} />
                        </div>
                    </div>
                </div>

                {fetchLoading ? (
                    <div className="coach_form_wrapper" style={{ padding: '2rem', textAlign: 'center' }}>
                        Loading profile...
                    </div>
                ) : (
                <form className="coach_form_wrapper" onSubmit={handleSave}>
                    <div className="coach_form_grid_wrapper">
                        <Input
                            label={'First Name'}
                            name="first_name"
                            placeholder={'Enter first name'}
                            required={true}
                            value={form.first_name}
                            onChange={(e) => updateField('first_name', e.target.value)}
                        />
                        <Input
                            label={'Last Name'}
                            name="last_name"
                            placeholder={'Enter last name'}
                            required={true}
                            value={form.last_name}
                            onChange={(e) => updateField('last_name', e.target.value)}
                        />
                        <Input
                            label={'Email'}
                            name="email"
                            type="email"
                            placeholder={'Enter email'}
                            required={true}
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                        />
                       
                        <div className='input_form confirm_input_form'>
                            <label>Phone no<span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select
                                    name='phone_country_code_id'
                                    value={form.phone_country_code_id}
                                    onChange={(e) => updateField('phone_country_code_id', e.target.value)}
                                    style={{ border: 'none', borderRight: '2px solid #000', outline: 'none' }}
                                    disabled={phoneCodesLoading}
                                >
                                    <option value="">Select code</option>
                                    {phoneCodes.map((pc) => (
                                        <option key={pc.id} value={String(pc.id)}>
                                            +{pc.phone_code ?? pc.code ?? pc.country_code ?? pc.id}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    name='phone'
                                    placeholder='Enter phone number'
                                    value={form.phone}
                                    onChange={(e) => updateField('phone', e.target.value)}
                                />
                            </div>
                        </div>

                        <h2 style={{ gridColumn: '1/-1', fontSize: '22px', fontWeight: '700' }}>Address</h2>

                        <Input
                            label={'Address Line 1'}
                            name="address_line_1"
                            placeholder={'Enter address line 1'}
                            required={true}
                            value={form.address_line_1}
                            onChange={(e) => updateField('address_line_1', e.target.value)}
                        />
                        <Input
                            label={'Address Line 2'}
                            name="address_line_2"
                            placeholder={'Enter address line 2'}
                            value={form.address_line_2}
                            onChange={(e) => updateField('address_line_2', e.target.value)}
                        />
                        <Input
                            label={'Landmark'}
                            name="landmark"
                            placeholder={'Enter landmark'}
                            value={form.landmark}
                            onChange={(e) => updateField('landmark', e.target.value)}
                        />

                        <div className='input_form'>
                            <label>Country<span>*</span></label>
                            <select
                                name="country_id"
                                value={form.country_id}
                                onChange={(e) => updateField('country_id', e.target.value)}
                                disabled={countriesLoading}
                            >
                                <option value=''>--Select country--</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='input_form'>
                            <label>State<span>*</span></label>
                            <select
                                name="state_id"
                                value={form.state_id}
                                onChange={(e) => updateField('state_id', e.target.value)}
                                disabled={!form.country_id || statesLoading}
                            >
                                <option value=''>--Select state--</option>
                                {states.map((s) => (
                                    <option key={s.id} value={String(s.id)}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='input_form'>
                            <label>City<span>*</span></label>
                            <select
                                name="city_id"
                                value={form.city_id}
                                onChange={(e) => updateField('city_id', e.target.value)}
                                disabled={!form.state_id || citiesLoading}
                            >
                                <option value=''>--Select city--</option>
                                {cities.map((c) => (
                                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label={'Postal Code'}
                            name="postal_code"
                            placeholder={'Enter postal code'}
                            required={true}
                            value={form.postal_code}
                            onChange={(e) => updateField('postal_code', e.target.value)}
                        />

                        <div className='input_form' style={{ gridColumn: '1/-1' }}>
                            <label style={{ fontSize: '15px', fontWeight: '600' }}>Upload Image<span>*</span></label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={onFileChange}
                                style={{ display: 'none' }}
                            />
                            <div
                                className='files_upload_wrapper'
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                style={{ cursor: 'pointer' }}
                            >
                                {existingProfileImageUrl && !profileImage ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                        <img src={existingProfileImageUrl} alt="Profile preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <span style={{ fontSize: '12px', color: '#666' }}>Current photo</span>
                                    </div>
                                ) : (
                                    <img src={upload} alt="" />
                                )}
                                <p>Drag your files or <span>Browse</span></p>
                                <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                {profileImage && <small style={{ display: 'block', marginTop: '4px' }}>{profileImage.name}</small>}
                            </div>
                        </div>
                    </div>
                    {error && <small style={{ color: 'red', display: 'block', marginTop: '8px' }}>{error}</small>}
                </form>
                )}
            </div>
        </>
    )
}

export default EditCoachProfile
