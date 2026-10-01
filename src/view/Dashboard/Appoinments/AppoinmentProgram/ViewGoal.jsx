import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'
import {
    fetchProgramSessionDetails,
    getEnrollmentGoalSettingsGoals,
} from '../../../../utils/Program'

const formatDisplayDate = (value) => {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString('en-GB')
}

const formatCreatedBy = (goal) => {
    if (goal?.created_by_name) return goal.created_by_name
    if (goal?.created_by?.name) return goal.created_by.name
    if (goal?.creator_role) return goal.creator_role
    if (goal?.created_by_type) return goal.created_by_type
    if (typeof goal?.created_by === 'string') return goal.created_by
    return '—'
}

const formatGoalType = (goal) => {
    const raw =
        goal?.goal_type_label
        ?? goal?.goal_type_name
        ?? goal?.goal_type
    if (!raw) return '—'
    if (typeof raw === 'string' && raw.includes('_')) {
        return raw
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')
    }
    return raw
}

const formatDuration = (goal) => {
    if (goal?.duration_label) return goal.duration_label
    const value = goal?.duration_value
    const unit = goal?.duration_unit
    if (value != null && unit) {
        const plural = value === 1 ? unit : `${unit}s`
        return `${value} ${plural}`
    }
    return '—'
}

const ViewGoal = () => {
    const navigate = useNavigate()
    const { enrollmentId, sessionId, structureId, goalId } = useParams()
    const [loading, setLoading] = useState(true)
    const [goal, setGoal] = useState(null)
    const [sessionData, setSessionData] = useState({})

    const goalSettingsPath = `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/goal-settings/${structureId}`
    const programName = sessionData?.program?.name ?? 'Program'

    const subGoals = useMemo(() => {
        const list = goal?.sub_goals ?? goal?.subGoals ?? []
        return Array.isArray(list) ? list : []
    }, [goal])

    const hasSubGoals = subGoals.length > 0

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
                setLoading(false)
                return
            }
            setLoading(true)
            const res = await getEnrollmentGoalSettingsGoals(enrollmentId, structureId)
            if (res?.success && res?.data) {
                const goals = res.data.goals ?? []
                const match = goals.find((g) => String(g.id) === String(goalId))
                setGoal(match ?? null)
            } else {
                setGoal(null)
            }
            setLoading(false)
        }
        loadGoal()
    }, [enrollmentId, structureId, goalId])

    const goalName = goal?.goal_name ?? goal?.name ?? 'Goal'

    return (
        <>
            {loading && <DashboardLoader />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>{goal ? goalName : 'View Goal'}</h2>
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
                            <span>{goal ? goalName : 'View Goal'}</span>
                        </small>
                    </div>
                </div>

                {!loading && !goal && (
                    <p style={{ marginTop: '24px' }}>Goal not found.</p>
                )}

                {goal && (
                    <div className='view_goal_wrapper'>
                        <div
                            className='view_goal_1'
                            style={hasSubGoals ? { width: '50%' } : { width: '100%' }}
                        >
                            <h4>
                                Goal Name: <span>{goalName}</span>
                            </h4>
                            <h4>
                                Goal Type: <span>{formatGoalType(goal)}</span>
                            </h4>
                            <h4>
                                Goal Created by: <span>{formatCreatedBy(goal)}</span>
                            </h4>
                            <h4>
                                Start date: <span>{formatDisplayDate(goal.start_date)}</span>
                            </h4>
                            <h4>
                                Duration: <span>{formatDuration(goal)}</span>
                            </h4>

                            <h4>Why is it important?</h4>
                            <p>{goal.why_important ?? '—'}</p>

                            <h4>Measurable Outcome</h4>
                            <p>{goal.measurable_outcome ?? '—'}</p>

                            <h4>Sub Goal Enabled: {hasSubGoals ? 'Yes' : 'No'}</h4>

                            <h4>Motivation</h4>
                            <p>{goal.motivation ?? '—'}</p>

                            <h4>Reward</h4>
                            <p>{goal.reward ?? '—'}</p>

                            <h4>Next Step</h4>
                            <p>{goal.next_step ?? '—'}</p>
                        </div>

                        {hasSubGoals && (
                            <div className='sub_goal_2'>
                                <h4>Sub Goals:</h4>
                                {subGoals.map((sg, index) => (
                                    <div
                                        key={sg.id ?? index}
                                        style={
                                            index > 0
                                                ? { marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #eee' }
                                                : undefined
                                        }
                                    >
                                        <h4>
                                            Sub Goal Name:{' '}
                                            <span>{sg.sub_goal_name ?? sg.name ?? '—'}</span>
                                        </h4>
                                        <h4>
                                            Sub Goal Type: <span>{formatGoalType(sg)}</span>
                                        </h4>
                                        <h4>
                                            Start date:{' '}
                                            <span>{formatDisplayDate(sg.start_date)}</span>
                                        </h4>
                                        <h4>
                                            End date: <span>{formatDisplayDate(sg.end_date)}</span>
                                        </h4>
                                        <h4>Motivation</h4>
                                        <p>{sg.motivation ?? '—'}</p>
                                        <h4>Reward</h4>
                                        <p>{sg.reward ?? '—'}</p>
                                        <h4>Next Step</h4>
                                        <p>{sg.next_step ?? '—'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewGoal
