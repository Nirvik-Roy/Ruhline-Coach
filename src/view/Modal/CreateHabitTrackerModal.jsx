import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Input from '../../Components/Input'
import Button from '../../Components/Button.jsx'
import { createHabitTrackerHabit, updateHabitTrackerHabit } from '../../utils/Program'

const API_FIELD_TO_FORM = {
    reminder_time: 'reminderTime',
}

const showBackendFieldErrors = (apiErrors) => {
    if (!apiErrors || typeof apiErrors !== 'object' || Array.isArray(apiErrors)) return

    Object.values(apiErrors).forEach((messages) => {
        const list = Array.isArray(messages) ? messages : [messages]
        list.forEach((msg) => {
            if (msg != null && String(msg).trim()) toast.error(String(msg))
        })
    })
}

const normalizeBackendErrors = (apiErrors) => {
    const normalized = {}
    if (!apiErrors || typeof apiErrors !== 'object') return normalized

    Object.entries(apiErrors).forEach(([key, value]) => {
        const formKey = API_FIELD_TO_FORM[key] ?? key
        const message = Array.isArray(value) ? value[0] : value
        if (message != null && String(message).trim()) {
            normalized[formKey] = String(message)
        }
    })
    return normalized
}

const FREQUENCY_UI_TO_UNIT = {
    Daily: 'day',
    Weekly: 'week',
    Monthly: 'month',
}

const FREQUENCY_UNIT_TO_UI = {
    day: 'Daily',
    week: 'Weekly',
    month: 'Monthly',
}

const emptyFormValue = {
    habit_type_id: '',
    linked_goal_id: '',
    habit_name: '',
    frequency: '',
    frequency_interval: '',
    days_of_week: [],
    monthly_mode: '',
    day_of_month: '',
    week_of_month: '',
    monthly_day_of_week: '',
    start_date: '',
    end_date: '',
    target_count: '',
    target_period: '',
    reminderTime: '',
}

const toDateInput = (value) => {
    if (!value) return ''
    const s = String(value)
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10)
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    return d.toISOString().slice(0, 10)
}

const toTimeInput = (value) => {
    if (!value) return ''
    const parts = String(value).split(':')
    return `${parts[0]?.padStart(2, '0') ?? '00'}:${parts[1]?.padStart(2, '0') ?? '00'}`
}

const habitToFormValue = (habit) => {
    if (!habit) return { ...emptyFormValue }
    return {
        habit_type_id: habit.habit_type_id != null ? String(habit.habit_type_id) : '',
        linked_goal_id: habit.linked_goal_id != null ? String(habit.linked_goal_id) : '',
        habit_name: habit.habit_name ?? '',
        frequency: FREQUENCY_UNIT_TO_UI[habit.frequency_unit] ?? '',
        frequency_interval: habit.frequency_interval ?? '',
        days_of_week: habit.days_of_week ?? [],
        monthly_mode: habit.monthly_mode ?? '',
        day_of_month: habit.day_of_month ?? '',
        week_of_month: habit.week_of_month ?? '',
        monthly_day_of_week: habit.monthly_day_of_week ?? '',
        start_date: toDateInput(habit.start_date),
        end_date: toDateInput(habit.end_date),
        target_count: habit.target_count ?? '',
        target_period: habit.target_period ?? '',
        reminderTime: toTimeInput(habit.reminder_time),
    }
}

const formatReminderForApi = (time) => {
    if (!time) return ''
    const parts = String(time).split(':')
    const h = parts[0]?.padStart(2, '0') ?? '00'
    const m = parts[1]?.padStart(2, '0') ?? '00'
    return `${h}:${m}`
}

const buildCreateHabitPayload = (formValue) => {
    const frequency_unit = FREQUENCY_UI_TO_UNIT[formValue.frequency] || 'day'
    const payload = {
        habit_type_id: Number(formValue.habit_type_id),
        linked_goal_id: Number(formValue.linked_goal_id),
        habit_name: formValue.habit_name.trim(),
        frequency_unit,
        frequency_interval: Number(formValue.frequency_interval) || 1,
        start_date: formValue.start_date,
        end_date: formValue.end_date,
        target_count: Number(formValue.target_count),
        target_period: formValue.target_period,
        reminder_time: formatReminderForApi(formValue.reminderTime),
        timezone: "UTC",
    }

    if (frequency_unit === 'week') {
        payload.days_of_week = formValue.days_of_week ?? []
    }

    if (frequency_unit === 'month') {
        payload.monthly_mode = formValue.monthly_mode
        if (payload.monthly_mode === 'day_of_month') {
            payload.day_of_month = Number(formValue.day_of_month)
        } else {
            payload.week_of_month = formValue.week_of_month
            payload.monthly_day_of_week = formValue.monthly_day_of_week
        }
    }

    return payload
}

const validateForm = (formValue) => {
    const errors = {}
    const {
        habit_type_id,
        linked_goal_id,
        habit_name,
        frequency,
        frequency_interval,
        start_date,
        end_date,
        target_count,
        target_period,
        reminderTime,
    } = formValue

    if (!habit_type_id) errors.habit_type_id = 'Habit type is required.'
    if (!habit_name?.trim()) errors.habit_name = 'Habit name is required.'
    if (!frequency) errors.frequency = 'Frequency is required.'

    const interval = Number(frequency_interval)
    if (frequency_interval === '' || Number.isNaN(interval) || interval < 1) {
        errors.frequency_interval = 'Frequency interval is required (minimum 1).'
    }

    if (!target_period) errors.target_period = 'Target period is required.'

    const count = Number(target_count)
    if (target_count === '' || Number.isNaN(count) || count < 1) {
        errors.target_count = 'Target count is required (minimum 1).'
    }

    if (!linked_goal_id) errors.linked_goal_id = 'Goal is required.'
    if (!start_date) errors.start_date = 'Start date is required.'
    if (!end_date) errors.end_date = 'End date is required.'
    else if (start_date && end_date < start_date) {
        errors.end_date = 'End date must be on or after start date.'
    }
    if (!reminderTime) errors.reminderTime = 'Reminder time is required.'

    if (frequency === 'Weekly' && !formValue.days_of_week?.length) {
        errors.days_of_week = 'Select at least one day of the week.'
    }

    if (frequency === 'Monthly') {
        if (!formValue.monthly_mode) {
            errors.monthly_mode = 'Monthly schedule is required.'
        }
        if (formValue.monthly_mode === 'day_of_month') {
            const dom = Number(formValue.day_of_month)
            if (formValue.day_of_month === '' || Number.isNaN(dom) || dom < 1 || dom > 31) {
                errors.day_of_month = 'Day of month is required (1–31).'
            }
        }
        if (formValue.monthly_mode === 'weekday_of_month') {
            if (!formValue.week_of_month) errors.week_of_month = 'Week of month is required.'
            if (!formValue.monthly_day_of_week) {
                errors.monthly_day_of_week = 'Weekday is required.'
            }
        }
    }

    return errors
}

const FieldError = ({ message }) =>
    message ? (
        <p style={{ color: '#e57373', fontSize: '12px', margin: '4px 0 0' }}>{message}</p>
    ) : null

const defaultWeekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]

const CreateHabitTrackerModal = ({
    sethabitTracker,
    enrollmentId,
    structureId,
    options,
    onSuccess,
    habitId,
    initialHabit,
}) => {
    const isEdit = Boolean(habitId && initialHabit)
    const habitTypes = options?.habit_types ?? []
    const goalOptions = options?.goal_options ?? []
    const weekdays = options?.weekdays?.length ? options.weekdays : defaultWeekdays
    const targetPeriods = options?.target_periods ?? ['day', 'week', 'month']
    const monthlyModes = options?.monthly_modes ?? ['day_of_month', 'weekday_of_month']
    const weekOfMonthOptions = options?.week_of_month_options ?? []

    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [formValue, setformValue] = useState(() =>
        isEdit ? habitToFormValue(initialHabit) : { ...emptyFormValue }
    )

    useEffect(() => {
        if (isEdit) {
            setformValue(habitToFormValue(initialHabit))
            setErrors({})
        } else {
            setformValue({ ...emptyFormValue })
            setErrors({})
        }
    }, [habitId, initialHabit, isEdit])

    const clearError = (name) => {
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[name]
                return next
            })
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setformValue({ ...formValue, [name]: value })
        clearError(name)
        if (name === 'start_date' || name === 'end_date') clearError('end_date')
    }

    const onFrequencyChange = (e) => {
        const { value } = e.target
        setformValue((prev) => ({
            ...prev,
            frequency: value,
            days_of_week: [],
            monthly_mode: '',
            day_of_month: '',
            week_of_month: '',
            monthly_day_of_week: '',
        }))
        ;['frequency', 'days_of_week', 'monthly_mode', 'day_of_month', 'week_of_month', 'monthly_day_of_week'].forEach(
            clearError
        )
    }

    const toggleWeekday = (day) => {
        setformValue((prev) => {
            const set = new Set(prev.days_of_week)
            if (set.has(day)) set.delete(day)
            else set.add(day)
            return { ...prev, days_of_week: [...set] }
        })
        clearError('days_of_week')
    }

    const submitHabit = async () => {
        const fieldErrors = validateForm(formValue)
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors)
            return
        }

        const payload = buildCreateHabitPayload(formValue)
        setSubmitting(true)
        const res = isEdit
            ? await updateHabitTrackerHabit(enrollmentId, structureId, habitId, payload)
            : await createHabitTrackerHabit(enrollmentId, structureId, payload)
        setSubmitting(false)

        if (res?.success) {
            onSuccess?.()
            sethabitTracker(false)
            return
        }

        if (res && typeof res === 'object' && !res.success) {
            showBackendFieldErrors(res)
            setErrors((prev) => ({ ...prev, ...normalizeBackendErrors(res) }))
        }
    }

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    return (
        <>
            <div className='modal_wrapper' onClick={() => sethabitTracker(false)}></div>
            <div className='modal_div'>
                <h4>{isEdit ? 'Edit Habit' : 'Create Habit'}</h4>
                <i className='fa-solid fa-xmark' onClick={() => sethabitTracker(false)}></i>
                <form className='modal_form' onSubmit={(e) => e.preventDefault()}>
                    <div className='input_form'>
                        <label>Select Habit type <span>*</span></label>
                        <select
                            name='habit_type_id'
                            value={formValue.habit_type_id}
                            onChange={onChange}
                        >
                            <option value=''>Select type</option>
                            {habitTypes.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        <FieldError message={errors.habit_type_id} />
                    </div>
                    <div>
                        <Input
                            fieldNecessary={true}
                            onChange={onChange}
                            name='habit_name'
                            label='Habit Name'
                            required={true}
                            value={formValue.habit_name}
                        />
                        <FieldError message={errors.habit_name} />
                    </div>

                    <div className='input_form'>
                        <label>Enter frequency <span>*</span></label>
                        <div
                            className='modal_full_day_radio_inputs_wrapper'
                            style={{ marginTop: '3px', paddingLeft: '6px' }}
                        >
                            {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                                <div key={freq} className='modal_full_day_input_wrapper'>
                                    <input
                                        onChange={onFrequencyChange}
                                        name='frequency'
                                        checked={formValue.frequency === freq}
                                        value={freq}
                                        type='radio'
                                    />
                                    <p>{freq}</p>
                                </div>
                            ))}
                        </div>
                        <FieldError message={errors.frequency} />
                    </div>

                    <div>
                        <Input
                            fieldNecessary={true}
                            onChange={onChange}
                            name='frequency_interval'
                            label='Frequency interval (every N days/weeks/months)'
                            required={true}
                            type='number'
                            min={1}
                            value={formValue.frequency_interval}
                        />
                        <FieldError message={errors.frequency_interval} />
                    </div>

                    {formValue.frequency === 'Weekly' && (
                        <div className='input_form'>
                            <label>Days of week <span>*</span></label>
                            <div
                                className='modal_full_day_radio_inputs_wrapper'
                                style={{ flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}
                            >
                                {weekdays.map((day) => (
                                    <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <input
                                            type='checkbox'
                                            checked={formValue.days_of_week.includes(day)}
                                            onChange={() => toggleWeekday(day)}
                                        />
                                        {capitalize(day)}
                                    </label>
                                ))}
                            </div>
                            <FieldError message={errors.days_of_week} />
                        </div>
                    )}

                    {formValue.frequency === 'Monthly' && (
                        <>
                            <div className='input_form'>
                                <label>Monthly schedule <span>*</span></label>
                                <select
                                    name='monthly_mode'
                                    value={formValue.monthly_mode}
                                    onChange={onChange}
                                >
                                    <option value=''>Select schedule</option>
                                    {monthlyModes.map((mode) => (
                                        <option key={mode} value={mode}>
                                            {mode === 'day_of_month' ? 'Day of month' : 'Weekday of month'}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.monthly_mode} />
                            </div>
                            {formValue.monthly_mode === 'day_of_month' && (
                                <div>
                                    <Input
                                        fieldNecessary={true}
                                        onChange={onChange}
                                        name='day_of_month'
                                        label='Day of month (1–31)'
                                        type='number'
                                        min={1}
                                        max={31}
                                        value={formValue.day_of_month}
                                    />
                                    <FieldError message={errors.day_of_month} />
                                </div>
                            )}
                            {formValue.monthly_mode === 'weekday_of_month' && (
                                <div className='habit_grid_wrapper'>
                                    <div className='input_form'>
                                        <label>Week of month <span>*</span></label>
                                        <select
                                            name='week_of_month'
                                            value={formValue.week_of_month}
                                            onChange={onChange}
                                        >
                                            <option value=''>Select</option>
                                            {weekOfMonthOptions.map((w) => (
                                                <option key={w} value={w}>{capitalize(w)}</option>
                                            ))}
                                        </select>
                                        <FieldError message={errors.week_of_month} />
                                    </div>
                                    <div className='input_form'>
                                        <label>Weekday <span>*</span></label>
                                        <select
                                            name='monthly_day_of_week'
                                            value={formValue.monthly_day_of_week}
                                            onChange={onChange}
                                        >
                                            <option value=''>Select</option>
                                            {weekdays.map((day) => (
                                                <option key={day} value={day}>{capitalize(day)}</option>
                                            ))}
                                        </select>
                                        <FieldError message={errors.monthly_day_of_week} />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className='habit_grid_wrapper'>
                        <div>
                            <Input
                                fieldNecessary={true}
                                onChange={onChange}
                                name='target_count'
                                label='Target count'
                                required={true}
                                type='number'
                                min={1}
                                value={formValue.target_count}
                            />
                            <FieldError message={errors.target_count} />
                        </div>
                        <div className='input_form'>
                            <label>Target period <span>*</span></label>
                            <select
                                name='target_period'
                                value={formValue.target_period}
                                onChange={onChange}
                            >
                                <option value=''>Select period</option>
                                {targetPeriods.map((p) => (
                                    <option key={p} value={p}>{capitalize(p)}</option>
                                ))}
                            </select>
                            <FieldError message={errors.target_period} />
                        </div>
                        <div className='input_form'>
                            <label>Combine with goal <span>*</span></label>
                            <select
                                name='linked_goal_id'
                                value={formValue.linked_goal_id}
                                onChange={onChange}
                            >
                                <option value=''>Select goal</option>
                                {goalOptions.map((g) => (
                                    <option key={g.id} value={g.id}>{g.goal_name}</option>
                                ))}
                            </select>
                            <FieldError message={errors.linked_goal_id} />
                        </div>
                    </div>

                    <div className='habit_grid_wrapper'>
                        <div>
                            <Input
                                fieldNecessary={true}
                                onChange={onChange}
                                name='start_date'
                                label='Start date'
                                required={true}
                                type='date'
                                value={formValue.start_date}
                            />
                            <FieldError message={errors.start_date} />
                        </div>
                        <div>
                            <Input
                                fieldNecessary={true}
                                onChange={onChange}
                                name='end_date'
                                label='End date'
                                required={true}
                                type='date'
                                value={formValue.end_date}
                            />
                            <FieldError message={errors.end_date} />
                        </div>
                        <div>
                            <Input
                                fieldNecessary={true}
                                onChange={onChange}
                                name='reminderTime'
                                label='Reminder time'
                                required={true}
                                type='time'
                                value={formValue.reminderTime}
                            />
                            <FieldError message={errors.reminderTime} />
                        </div>
                    </div>

                    <div
                        onClick={() => !submitting && submitHabit()}
                        style={{ marginLeft: 'auto', opacity: submitting ? 0.6 : 1 }}
                    >
                        <Button
                            children={
                                submitting
                                    ? isEdit ? 'Updating...' : 'Creating...'
                                    : isEdit ? 'Update' : 'Create'
                            }
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateHabitTrackerModal
