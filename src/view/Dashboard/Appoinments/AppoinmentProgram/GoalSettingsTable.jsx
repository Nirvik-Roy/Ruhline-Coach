import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../Components/Button'
import ellipse from '../../../../assets/_MoreIcon_.svg'
import Pagination from '../../../../Components/Pagination/Pagination.jsx'
import DashboardLoader from '../../../../Components/Loaders/DashboardLoader'
import DeleteModal from '../../../../Components/DeleteModal/DeleteModal.jsx'
import {
    deleteEnrollmentGoalSettingsGoal,
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
    return (
        goal?.goal_type_label
        ?? goal?.goal_type_name
        ?? goal?.goal_type
        ?? '—'
    )
}

const mapGoalToTableRow = (goal) => ({
    id: goal.id,
    goalName: goal.goal_name ?? goal.name ?? '—',
    createdBy: formatCreatedBy(goal),
    goalType: formatGoalType(goal),
    startDate: formatDisplayDate(goal.start_date),
    goal,
})

const ITEMS_PER_PAGE = 10

const GoalSettingsTable = () => {
    const navigate = useNavigate()
    const { enrollmentId, sessionId, structureId } = useParams()
    const [openActionIndex, setOpenActionIndex] = useState(null)
    const [data, setData] = useState([])
    const [progress, setProgress] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sessionData, setSessionData] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [goalToDelete, setGoalToDelete] = useState(null)

    const applyGoalsResponse = (res, resetPage = false) => {
        if (res?.success && res?.data) {
            const goals = res.data.goals ?? []
            setData(goals.map(mapGoalToTableRow))
            setProgress(res.data.progress ?? null)
            if (resetPage) {
                setCurrentPage(0)
            } else {
                const pageCountAfter = Math.ceil(goals.length / ITEMS_PER_PAGE)
                setCurrentPage((prev) =>
                    pageCountAfter > 0 && prev >= pageCountAfter ? pageCountAfter - 1 : prev
                )
            }
            return true
        }
        setData([])
        setProgress(null)
        if (resetPage) {
            setCurrentPage(0)
        }
        return false
    }

    const getSessionDetails = async () => {
        const res = await fetchProgramSessionDetails(enrollmentId, sessionId)
        if (res?.success) {
            setSessionData(res?.data)
        }
    }

    const loadGoals = async () => {
        setLoading(true)
        const res = await getEnrollmentGoalSettingsGoals(enrollmentId, structureId)
        applyGoalsResponse(res, true)
        setLoading(false)
    }

    useEffect(() => {
        if (enrollmentId && sessionId) {
            getSessionDetails()
        }
    }, [enrollmentId, sessionId])

    useEffect(() => {
        if (enrollmentId && structureId) {
            loadGoals()
        }
    }, [enrollmentId, structureId])

    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest('.goal-actions-cell')) {
                setOpenActionIndex(null)
            }
        }
        document.addEventListener('mousedown', closeDropdown)
        return () => document.removeEventListener('mousedown', closeDropdown)
    }, [])

    const toggleActions = (index, event) => {
        event.stopPropagation()
        setOpenActionIndex((prev) => (prev === index ? null : index))
    }

    const programName = sessionData?.program?.name ?? 'Program'
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE)
    const offset = currentPage * ITEMS_PER_PAGE
    const currentItems = data.slice(offset, offset + ITEMS_PER_PAGE)

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected)
        setOpenActionIndex(null)
    }

    const openDeleteModal = (row) => {
        setOpenActionIndex(null)
        setGoalToDelete(row)
        setDeleteModal(true)
    }

    const handleDeleteGoal = async () => {
        if (!goalToDelete?.id) return
        setDeleteLoading(true)
        const res = await deleteEnrollmentGoalSettingsGoal(
            enrollmentId,
            structureId,
            goalToDelete.id
        )
        if (res?.success) {
            applyGoalsResponse(res)
            setDeleteModal(false)
            setGoalToDelete(null)
        }
        setDeleteLoading(false)
    }

    return (
        <>
            {deleteModal && (
                <DeleteModal
                    loading={deleteLoading}
                    loadingText='Deleting...'
                    setdeleteModal={setDeleteModal}
                    onClick={handleDeleteGoal}
                    title={'Delete Goal'}
                    details={`Do you really want to delete "${goalToDelete?.goalName ?? 'this goal'}"?`}
                />
            )}
            {loading && <DashboardLoader />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Goal Settings</h2>
                        {progress?.total_goals != null && (
                            <p style={{ margin: '4px 0 0', fontSize: '14px' }}>
                                {progress.total_goals} goal
                                {progress.total_goals === 1 ? '' : 's'}
                                {progress.is_completed ? ' · Completed' : ''}
                            </p>
                        )}
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
                            <span>Goal Settings</span>
                        </small>
                    </div>
                    <div
                        onClick={() =>
                            navigate(
                                `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/goal-settings/${structureId}/create-goal`
                            )
                        }
                    >
                        <Button children={'Create Goal'} />
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Goal Name</th>
                                <th style={{ textAlign: 'center' }}>Created by</th>
                                <th>Goal Type</th>
                                <th>Start Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && data.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '20px 0', textAlign: 'center' }}>
                                        No goals yet.
                                    </td>
                                </tr>
                            )}
                            {currentItems.map((row, index) => (
                                <tr key={row.id ?? index}>
                                    <td style={{ padding: '20px 0' }}>{row.goalName}</td>
                                    <td style={{ padding: '20px 0', textAlign: 'center' }}>
                                        {row.createdBy}
                                    </td>
                                    <td style={{ padding: '20px 0' }}>{row.goalType}</td>
                                    <td style={{ padding: '20px 0' }}>{row.startDate}</td>
                                    <td
                                        className='goal-actions-cell'
                                        style={{
                                            padding: '20px 0',
                                            position: 'relative',
                                            textAlign: 'right',
                                        }}
                                    >
                                        <img
                                            onClick={(e) => toggleActions(index, e)}
                                            src={ellipse}
                                            alt='Goal actions'
                                            style={{ cursor: 'pointer' }}
                                        />
                                        {openActionIndex === index && (
                                            <div className='actions_wrapper' style={{
                                                maxWidth:'150px',
                                                left:'0%',
                                                height:'fit-content'
                                            }}>
                                                <p
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/goal-settings/${structureId}/view-goal/${row.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </p>
                                                <p
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}/goal-settings/${structureId}/edit-goal/${row.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </p>
                                                <p onClick={() => openDeleteModal(row)}>Delete</p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default GoalSettingsTable
