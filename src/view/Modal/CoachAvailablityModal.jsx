import React, { useState } from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { updateProgramCoachAvailablity } from '../../utils/Program'
import { useParams } from 'react-router-dom'
import Loaders from '../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
const CoachAvailablityModal = ({ setavailablityModal, fetchCoachAvailablity, singleProgramData }) => {
    const [loading, setloading] = useState(false);
    const { id } = useParams()
    const [daysWeek, setdaysWeek] = useState([])
    const [startTime, setstartTime] = useState('')
    const [endTime, setendTime] = useState('')
    const [startDate, setstartDate] = useState('')
    const [endDate, setendDate] = useState('');


    const isValid = () => {
        // ✅ check date
        if (startDate && endDate && startDate > endDate) {
            toast.error("Start date should be before or equal to end date");
            return false;
        }

        // ❌ basic time order check
        if (startTime && endTime && startTime >= endTime) {
            toast.error("Start time should be less than end time");
            return false;
        }

        // ✅ duration check (UPDATED)
        if (startTime && endTime) {
            const [sh, sm] = startTime.split(":").map(Number);
            const [eh, em] = endTime.split(":").map(Number);

            const start = new Date(2024, 0, 1, sh, sm);
            const end = new Date(2024, 0, 1, eh, em);

            const diffInMinutes = (end - start) / (1000 * 60);
            // JS subtracts dates in milliseconds, then we convert to minutes :contentReference[oaicite:0]{index=0}

            // 🔥 CHANGE HERE
            if (diffInMinutes < singleProgramData?.session_duration_minutes) {
                toast.error("Time should not be less than program duration");
                return false;
            }
        }

        return true;
    };
    const addDays = (event) => {
        const value = event.target.value
        setdaysWeek((prev) => {
            if (prev.includes(Number(value))) {
                return prev.filter((e) => e !== Number(value))
            } else {
                return [...prev, Number(value)]
            }
        })
    }

    const submitAvailablity = async () => {
        try {
            if (!isValid()) return;
            setloading(true);
            const rules = daysWeek.map((element) => ({
                day_of_week: element,
                start_time: startTime,
                end_time: endTime,
                effective_from: startDate,
                effective_to: endDate
            }))
            const formData = new FormData()
            // formData.append("rules[]", JSON.stringify(rules))
            if (rules?.length > 0) {
                rules.forEach((element, index) => {
                    formData.append(`rules[${index}][day_of_week]`, element?.day_of_week)
                    if (element?.start_time) {
                        formData.append(`rules[${index}][start_time]`, element?.start_time)
                    }
                    if (element?.end_time) {
                        formData.append(`rules[${index}][end_time]`, element?.end_time)
                    }

                    if (element?.effective_from) {
                        formData.append(`rules[${index}][effective_from]`, element?.effective_from)
                    }

                    if (element?.effective_to) {
                        formData.append(`rules[${index}][effective_to]`, element?.effective_to)
                    }
                })
            }
            const res = await updateProgramCoachAvailablity(formData, id);
            if (res?.success) {
                setavailablityModal(false)
                fetchCoachAvailablity()
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper'></div>
            <div className='modal_div' style={{
                height: '80vh'
            }}>
                <h4 onClick={(() => setavailablityModal(false))}>Update Availability</h4>
                <i onClick={(() => setavailablityModal(false))} className="fa-solid fa-xmark"></i>
                <form className='modal_form'>
                    {singleProgramData?.session_duration_minutes && <p style={{
                        fontWeight: '600',
                        color: 'var(--text-color)'
                    }}>Program Duration - {singleProgramData?.session_duration_minutes} mins</p>}
                    <Input type={'date'} value={startDate} onChange={((e) => setstartDate(e.target.value))} label={'Start Date'} required={true} />
                    <Input type={'date'} value={endDate} onChange={((e) => setendDate(e.target.value))} label={'End Date'} required={true} />
                    <h4 style={{
                        color: 'var(--text-color)'
                    }}>Days</h4>
                    <div className='days_grid_wrapper' style={{
                        margin: '0px 0 10px 0'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(0)} value={0} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Sunday</p>
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(1)} value={1} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Monday</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(2)} value={2} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Tuesday</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(3)} value={3} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Wednesday</p>
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(4)} value={4} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Thursday</p>
                        </div>


                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(5)} value={5} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Friday</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <input onChange={addDays} style={{
                                width: '19px',
                                height: '19px',
                                accentColor: 'var(--primary-color)'
                            }} type='checkbox' checked={daysWeek.includes(6)} value={6} />
                            <p style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                color: 'var(--text-color)'
                            }}>Saturday</p>
                        </div>
                    </div>
                    <Input type={'time'} value={startTime} onChange={((e) => setstartTime(e.target.value))} label={'Start Time'} required={true} />
                    <Input type={'time'} value={endTime} onChange={((e) => setendTime(e.target.value))} label={'End Time'} required={true} />
                </form>

                <Button onClick={submitAvailablity} children={'Update'} styles={{
                    marginLeft: 'auto',
                    marginTop: '15px'
                }} />
            </div>
        </>
    )
}

export default CoachAvailablityModal
