import React, { useEffect, useState } from 'react'
import Button from '../../../../Components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../../../Components/Input'
import Textarea from '../../../../Components/Textarea.jsx'
import cross from '../../../../assets/content (1).svg'
import toast from 'react-hot-toast'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'
import DeleteModal from '../../../../Components/DeleteModal/DeleteModal'
import {
    deleteEnrollmentGoalSettingsSubGoal,
    fetchProgramSessionDetails,
    getEnrollmentGoalSettingsGoals,
    updateEnrollmentGoalSettingsGoal,
    updateEnrollmentGoalSettingsSubGoal,
} from '../../../../utils/Program'

const DURATION_OPTIONS = [
    { label: '1 week', value: 1, unit: 'week' },
    { label: '2 weeks', value: 2, unit: 'week' },
    { label: '3 weeks', value: 3, unit: 'week' },
    { label: '1 month', value: 1, unit: 'month' },
    { label: '2 months', value: 2, unit: 'month' },
    { label: '3 months', value: 3, unit: 'month' },
    { label: '6 months', value: 6, unit: 'month' },
    { label: '1 year', value: 1, unit: 'year' },
]

const emptySubGoal = () => ({
    sub_goal_name: '',
    goal_type: 'short_term',
    start_date: '',
    end_date: '',
    motivation: '',
    reward: '',
    next_step: '',
})

const toDateInputValue = (value) => {
    if (!value) return ''
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return String(value)
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toISOString().slice(0, 10)
}

const findDurationKey = (durationValue, durationUnit) => {
    const idx = DURATION_OPTIONS.findIndex(
        (opt) =>
            opt.value === Number(durationValue)
            && opt.unit === durationUnit
    )
    return idx >= 0 ? String(idx) : '0'
}

const mapSubGoalFromApi = (sg) => ({
    id: sg.id,
    sub_goal_name: sg.sub_goal_name ?? sg.name ?? '',
    goal_type: sg.goal_type ?? 'short_term',
    start_date: toDateInputValue(sg.start_date),
    end_date: toDateInputValue(sg.end_date),
    motivation: sg.motivation ?? '',
    reward: sg.reward ?? '',
    next_step: sg.next_step ?? '',
})

const UpdateGoal = () => {
    const navigate = useNavigate()
    const { enrollmentId, sessionId, structureId, goalId } = useParams()
    const [enable, setenable] = useState(false)
    const [subGoals, setSubGoals] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [sessionData, setSessionData] = useState({})
    const [durationKey, setDurationKey] = useState('0')
    const [deleteModal, setDeleteModal] = useState(false)
    const [subGoalToDelete, setSubGoalToDelete] = useState(null)
    const [deleteSubGoalLoading, setDeleteSubGoalLoading] = useState(false)
    const [form, setForm] = useState({
        goal_name: '',
        goal_type: 'short_term',
        start_date: '',
        why_important: '',
        measurable_outcome: '',
        motivation: '',
        reward: '',
        next_step: '',
    })

    const goalSettingsPath = `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/goal-settings/${structureId}`
    const programName = sessionData?.program?.name ?? 'Program'

    useEffect(() => {
        if (enrollmentId && sessionId) {
            fetchProgramSessionDetails(enrollmentId, sessionId).then((res) => {
                if (res?.success) {
                    setSessionData(res?.data ?? {})
                }
            })
        }
    }, [enrollmentId, sessionId])

    useEffect(() => {
        const loadGoal = async () => {
            if (!enrollmentId || !structureId || !goalId) {
                setFetching(false)
                return
            }
            setFetching(true)
            const res = await getEnrollmentGoalSettingsGoals(enrollmentId, structureId)
            if (res?.success && res?.data) {
                const goals = res.data.goals ?? []
                const goal = goals.find((g) => String(g.id) === String(goalId))
                if (!goal) {
                    toast.error('Goal not found.')
                    navigate(goalSettingsPath)
                    setFetching(false)
                    return
                }

                setForm({
                    goal_name: goal.goal_name ?? goal.name ?? '',
                    goal_type: goal.goal_type ?? 'short_term',
                    start_date: toDateInputValue(goal.start_date),
                    why_important: goal.why_important ?? '',
                    measurable_outcome: goal.measurable_outcome ?? '',
                    motivation: goal.motivation ?? '',
                    reward: goal.reward ?? '',
                    next_step: goal.next_step ?? '',
                })
                setDurationKey(findDurationKey(goal.duration_value, goal.duration_unit))

                const existingSubGoals = goal.sub_goals ?? goal.subGoals ?? []
                const mapped = Array.isArray(existingSubGoals)
                    ? existingSubGoals.map(mapSubGoalFromApi)
                    : []
                setSubGoals(mapped)
                setenable(mapped.length > 0)
            } else {
                toast.error('Could not load goal.')
                navigate(goalSettingsPath)
            }
            setFetching(false)
        }
        loadGoal()
    }, [enrollmentId, structureId, goalId])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const updateSubGoal = (index, field, value) => {
        setSubGoals((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        )
    }

    const openDeleteSubGoalModal = (index) => {
        const sg = subGoals[index]
        if (!sg) return
        setSubGoalToDelete({ index, id: sg.id, name: sg.sub_goal_name })
        setDeleteModal(true)
    }

    const handleConfirmDeleteSubGoal = async () => {
        if (subGoalToDelete == null) return

        const { index, id } = subGoalToDelete

        if (id) {
            setDeleteSubGoalLoading(true)
            try {
                const res = await deleteEnrollmentGoalSettingsSubGoal(
                    enrollmentId,
                    structureId,
                    goalId,
                    id
                )
                if (!res?.success) return
            } finally {
                setDeleteSubGoalLoading(false)
            }
        }

        setSubGoals((prev) => prev.filter((_, i) => i !== index))
        setDeleteModal(false)
        setSubGoalToDelete(null)
    }

    const addSubGoal = () => {
        setSubGoals((prev) => [...prev, emptySubGoal()])
    }

    const toggleEnable = () => {
        setenable((prev) => {
            if (prev) {
                setSubGoals([])
            }
            return !prev
        })
    }

    const buildPayload = () => {
        const duration = DURATION_OPTIONS[Number(durationKey)] ?? DURATION_OPTIONS[0]
        const payload = {
            goal_name: form.goal_name.trim(),
            goal_type: form.goal_type,
            start_date: form.start_date,
            duration_value: duration.value,
            duration_unit: duration.unit,
            why_important: form.why_important.trim(),
            measurable_outcome: form.measurable_outcome.trim(),
            motivation: form.motivation.trim(),
            reward: form.reward.trim(),
            next_step: form.next_step.trim(),
        }

        const newSubGoals = enable ? subGoals.filter((sg) => !sg.id) : []
        if (newSubGoals.length > 0) {
            payload.sub_goals = newSubGoals.map((sg) => ({
                sub_goal_name: sg.sub_goal_name.trim(),
                goal_type: sg.goal_type,
                start_date: sg.start_date,
                end_date: sg.end_date,
                motivation: sg.motivation.trim(),
                reward: sg.reward.trim(),
                next_step: sg.next_step.trim(),
            }))
        }

        return payload
    }

    const buildSubGoalUpdatePayload = (sg) => ({
        sub_goal_name: sg.sub_goal_name.trim(),
        goal_type: sg.goal_type,
        start_date: sg.start_date,
        end_date: sg.end_date,
        motivation: sg.motivation.trim(),
        reward: sg.reward.trim(),
        next_step: sg.next_step.trim(),
    })

    const validate = () => {
        if (!form.goal_name.trim()) {
            toast.error('Goal name is required.')
            return false
        }
        if (!form.start_date) {
            toast.error('Start date is required.')
            return false
        }
        if (!form.why_important.trim()) {
            toast.error('Why is it important? is required.')
            return false
        }
        if (!form.measurable_outcome.trim()) {
            toast.error('Measurable outcome is required.')
            return false
        }
        if (!form.motivation.trim()) {
            toast.error('Motivation is required.')
            return false
        }
        if (!form.reward.trim()) {
            toast.error('Reward is required.')
            return false
        }
        if (!form.next_step.trim()) {
            toast.error('Next step is required.')
            return false
        }

        if (enable && subGoals.length > 0) {
            for (let i = 0; i < subGoals.length; i += 1) {
                const sg = subGoals[i]
                if (!sg.sub_goal_name.trim()) {
                    toast.error(`Sub goal ${i + 1}: name is required.`)
                    return false
                }
                if (!sg.start_date || !sg.end_date) {
                    toast.error(`Sub goal ${i + 1}: start and end dates are required.`)
                    return false
                }
                if (!sg.motivation.trim() || !sg.reward.trim() || !sg.next_step.trim()) {
                    toast.error(`Sub goal ${i + 1}: motivation, reward, and next step are required.`)
                    return false
                }
            }
        }

        return true
    }

    const handleUpdate = async () => {
        if (!validate()) return

        setLoading(true)
        try {
            const existingSubGoals = enable
                ? subGoals.filter((sg) => sg.id)
                : []

            const requests = [
                updateEnrollmentGoalSettingsGoal(
                    enrollmentId,
                    structureId,
                    goalId,
                    buildPayload(),
                    { showSuccessToast: false }
                ),
                ...existingSubGoals.map((sg) =>
                    updateEnrollmentGoalSettingsSubGoal(
                        enrollmentId,
                        structureId,
                        goalId,
                        sg.id,
                        buildSubGoalUpdatePayload(sg)
                    )
                ),
            ]

            const results = await Promise.all(requests)
            const allSucceeded = results.every((res) => res?.success)

            if (allSucceeded) {
                toast.success('Goal updated successfully')
                navigate(`${goalSettingsPath}/view-goal/${goalId}`)
            }
        } finally {
            setLoading(false)
        }
    }

    const showLoader = fetching || loading

    return (
        <>
            {/* {showLoader && <DashboardLoader />} */}
            {deleteModal && (
                <DeleteModal
                    loading={deleteSubGoalLoading}
                    loadingText="Deleting..."
                    setdeleteModal={(open) => {
                        if (!deleteSubGoalLoading) {
                            setDeleteModal(open)
                            if (!open) setSubGoalToDelete(null)
                        }
                    }}
                    onClick={handleConfirmDeleteSubGoal}
                    title="Delete sub-goal?"
                    details={`Do you really want to delete "${subGoalToDelete?.name?.trim() || 'this sub-goal'}"?`}
                />
            )}
            {!fetching && (
                <div className='dashboard_container'>
                    <div className='appointes_head_wrapper'>
                        <div>
                            <h2>Update Goal</h2>
                            <small style={{ cursor: 'pointer' }}>
                                <span onClick={() => navigate('/dashboard/appoinments')}>
                                    Appointments
                                </span>
                                {' / '}
                                <span
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}`
                                        )
                                    }
                                >
                                    {programName}
                                </span>
                                {' / '}
                                <span onClick={() => navigate(goalSettingsPath)}>Goal Settings</span>
                                {' / '}
                                <span>Update Goal</span>
                            </small>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '20px',
                            }}
                        >
                            <span
                                onClick={() => navigate(goalSettingsPath)}
                                style={{
                                    color: 'var(--text-color)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </span>
                            <Button
                                children={'Update'}
                                onClick={handleUpdate}
                                loading={loading}
                            />
                        </div>
                    </div>

                    <div className='create_goal_form_wrapper'>
                        <Input
                            label={'Goal Name'}
                            required={true}
                            name='goal_name'
                            value={form.goal_name}
                            onChange={handleFormChange}
                        />
                        <div className='input_radio_buttons_wrapper'>
                            <div className='input_radio_wrapper'>
                                <input
                                    type='radio'
                                    name='goal_type'
                                    checked={form.goal_type === 'short_term'}
                                    onChange={() =>
                                        setForm((prev) => ({ ...prev, goal_type: 'short_term' }))
                                    }
                                />
                                <p>Short term</p>
                            </div>
                            <div className='input_radio_wrapper'>
                                <input
                                    type='radio'
                                    name='goal_type'
                                    checked={form.goal_type === 'long_term'}
                                    onChange={() =>
                                        setForm((prev) => ({ ...prev, goal_type: 'long_term' }))
                                    }
                                />
                                <p>Long term</p>
                            </div>
                        </div>

                        <div className='input_grid_Wrapper462'>
                            <Input
                                type={'date'}
                                label={'Start Date'}
                                required={true}
                                name='start_date'
                                value={form.start_date}
                                onChange={handleFormChange}
                            />
                            <div className='input_form'>
                                <label>
                                    Duration Selection <span>*</span>
                                </label>
                                <select
                                    value={durationKey}
                                    onChange={(e) => setDurationKey(e.target.value)}
                                >
                                    {DURATION_OPTIONS.map((opt, index) => (
                                        <option key={opt.label} value={String(index)}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Textarea
                            label={'Why is it important?'}
                            required={true}
                            name='why_important'
                            value={form.why_important}
                            onChange={handleFormChange}
                            placeholder={''}
                        />
                        <Textarea
                            label={'Measurable Outcome'}
                            required={true}
                            name='measurable_outcome'
                            value={form.measurable_outcome}
                            onChange={handleFormChange}
                            placeholder={''}
                        />
                        <Textarea
                            label={'Motivation'}
                            required={true}
                            name='motivation'
                            value={form.motivation}
                            onChange={handleFormChange}
                            placeholder={''}
                        />
                        <Textarea
                            label={'Reward'}
                            required={true}
                            name='reward'
                            value={form.reward}
                            onChange={handleFormChange}
                            placeholder={''}
                        />
                        <Textarea
                            label={'Next Step'}
                            required={true}
                            name='next_step'
                            value={form.next_step}
                            onChange={handleFormChange}
                            placeholder={''}
                        />
                        <div className='enbale_wrapper'>
                            <p>Enable Sub Goal</p>
                            <div
                                onClick={toggleEnable}
                                className={enable ? 'enable_toggle_wrapper' : 'enable_toggle_wrapper2'}
                                style={
                                    enable
                                        ? { background: 'var(--primary-color)' }
                                        : { background: '#293e5f' }
                                }
                            >
                                {enable ? (
                                    <i className='fa-solid fa-check'></i>
                                ) : (
                                    <i className='fa-solid fa-xmark'></i>
                                )}
                                <div className='toggle_circle'></div>
                            </div>
                        </div>
                        {enable && (
                            <div
                                onClick={addSubGoal}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Button
                                    styles={{
                                        border: '1px solid var(--primary-color)',
                                        background: 'transparent',
                                        color: 'var(--text-color)',
                                        padding: '10px 15px',
                                        fontSize: '15px',
                                    }}
                                    children={'Add Sub Goal'}
                                />
                            </div>
                        )}

                        {enable &&
                            subGoals.map((sg, i) => (
                                <div key={sg.id ?? i} className='sub_goal_wrapper'>
                                    <img
                                        onClick={() => openDeleteSubGoalModal(i)}
                                        src={cross}
                                        alt='Remove sub goal'
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                    <div className='create_goal_form_wrapper'>
                                        <Input
                                            label={'Sub Goal Name'}
                                            required={true}
                                            value={sg.sub_goal_name}
                                            onChange={(e) =>
                                                updateSubGoal(i, 'sub_goal_name', e.target.value)
                                            }
                                        />
                                        <div className='input_radio_buttons_wrapper'>
                                            <div className='input_radio_wrapper'>
                                                <input
                                                    type='radio'
                                                    checked={sg.goal_type === 'short_term'}
                                                    onChange={() =>
                                                        updateSubGoal(i, 'goal_type', 'short_term')
                                                    }
                                                />
                                                <p>Short term</p>
                                            </div>
                                            <div className='input_radio_wrapper'>
                                                <input
                                                    type='radio'
                                                    checked={sg.goal_type === 'long_term'}
                                                    onChange={() =>
                                                        updateSubGoal(i, 'goal_type', 'long_term')
                                                    }
                                                />
                                                <p>Long term</p>
                                            </div>
                                        </div>
                                        <div className='input_grid_Wrapper462'>
                                            <Input
                                                type={'date'}
                                                label={'Start Date'}
                                                required={true}
                                                value={sg.start_date}
                                                onChange={(e) =>
                                                    updateSubGoal(i, 'start_date', e.target.value)
                                                }
                                            />
                                            <Input
                                                type={'date'}
                                                label={'End Date'}
                                                required={true}
                                                value={sg.end_date}
                                                onChange={(e) =>
                                                    updateSubGoal(i, 'end_date', e.target.value)
                                                }
                                            />
                                        </div>
                                        <Textarea
                                            label={'Motivation'}
                                            required={true}
                                            value={sg.motivation}
                                            onChange={(e) =>
                                                updateSubGoal(i, 'motivation', e.target.value)
                                            }
                                            placeholder={''}
                                        />
                                        <Textarea
                                            label={'Reward'}
                                            required={true}
                                            value={sg.reward}
                                            onChange={(e) =>
                                                updateSubGoal(i, 'reward', e.target.value)
                                            }
                                            placeholder={''}
                                        />
                                        <Textarea
                                            label={'Next Step'}
                                            required={true}
                                            value={sg.next_step}
                                            onChange={(e) =>
                                                updateSubGoal(i, 'next_step', e.target.value)
                                            }
                                            placeholder={''}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdateGoal
