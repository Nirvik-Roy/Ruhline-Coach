import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../Components/Button";
import ellipse from "../../../../assets/_MoreIcon_.svg";
import Pagination from "../../../../Components/Pagination/Pagination.jsx";
import HabitTrackerModal from "../../../Modal/HabitTrackerModal.jsx";
import CreateHabitTrackerModal from "../../../Modal/CreateHabitTrackerModal.jsx";
import DeleteModal from "../../../../Components/DeleteModal/DeleteModal.jsx";
import DashboardLoader from "../../../../Components/Loaders/DashboardLoader";

import {
  deleteHabitTrackerHabit,
  fetchProgramSessionDetails,
  getHabitTrackerState,
} from "../../../../utils/Program";

const formatReminderTime = (time) => {
  if (!time) return "—";

  const [hours, minutes] = String(time).split(":");

  const h = Number(hours);

  if (Number.isNaN(h)) return time;

  const period = h >= 12 ? "PM" : "AM";

  const hour12 = h % 12 || 12;

  return `${hour12}:${minutes ?? "00"} ${period}`;
};

const mapHabitToTableRow = (habit) => ({
  id: habit.id,

  habitName: habit.habit_name ?? "—",

  limits:
    habit.target_count != null
      ? `${habit.target_count} per ${habit.target_period ?? "day"}`
      : "—",

  createdBy: habit.habit_type_name ?? "—",

  frequency:
    habit.frequency_label ||
    (habit.frequency_interval != null && habit.frequency_unit
      ? `Every ${habit.frequency_interval} ${habit.frequency_unit}`
      : "—"),

  reminderTime: formatReminderTime(habit.reminder_time),

  habit,
});

const Habitracker = () => {
  const navigate = useNavigate();

  const { enrollmentId, sessionId, structureId } = useParams();

  const [habitModal, sethabitModal] = useState(false);

  const [habitTracker, sethabitTracker] = useState(false);

  const [editHabitTracker, setEditHabitTracker] = useState(false);

  const [selectedHabit, setSelectedHabit] = useState(null);

  const [habitToEdit, setHabitToEdit] = useState(null);

  const [openActionIndex, setOpenActionIndex] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [habitToDelete, setHabitToDelete] = useState(null);

  const [data, setData] = useState([]);

  const [progress, setProgress] = useState(null);

  const [habitOptions, setHabitOptions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [sessionData, setSessionData] = useState({});

  const getSessionDetails = async () => {
    const res = await fetchProgramSessionDetails(enrollmentId, sessionId);

    if (res?.success) {
      setSessionData(res?.data);
    }
  };

  const loadHabitTrackerState = async () => {
    setLoading(true);

    const res = await getHabitTrackerState(enrollmentId, structureId);

    if (res?.success && res?.data) {
      const habits = res.data.habits ?? [];

      setData(habits.map(mapHabitToTableRow));

      setProgress(res.data.progress ?? null);

      setHabitOptions(res.data.options ?? null);
    } else {
      setData([]);

      setProgress(null);

      setHabitOptions(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (enrollmentId && sessionId) {
      getSessionDetails();
    }
  }, [enrollmentId, sessionId]);

  useEffect(() => {
    if (enrollmentId && structureId) {
      loadHabitTrackerState();
    }
  }, [enrollmentId, structureId]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".habit-actions-cell")) {
        setOpenActionIndex(null);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const toggleActions = (index, event) => {
    event.stopPropagation();

    setOpenActionIndex((prev) => (prev === index ? null : index));
  };

  const findHabitById = (habitId) => {
    const row = data.find((item) => String(item.id) === String(habitId));

    return row?.habit ?? null;
  };

  const openHabitView = (row) => {
    setOpenActionIndex(null);

    const habit = findHabitById(row.id) ?? row?.habit ?? row;

    setSelectedHabit(habit);

    sethabitModal(true);
  };

  const openHabitEdit = (row) => {
    setOpenActionIndex(null);

    const habit = findHabitById(row.id) ?? row?.habit;

    if (!habit?.id) return;

    setHabitToEdit(habit);

    setEditHabitTracker(true);
  };

  const openDeleteHabitModal = (row) => {
    setOpenActionIndex(null);

    setHabitToDelete(row);

    setDeleteModal(true);
  };

  const handleDeleteHabit = async () => {
    if (!habitToDelete?.id) return;

    setDeleteLoading(true);

    const res = await deleteHabitTrackerHabit(
      enrollmentId,

      structureId,

      habitToDelete.id,
    );

    if (res?.success) {
      await loadHabitTrackerState();

      setDeleteModal(false);

      setHabitToDelete(null);
    }

    setDeleteLoading(false);
  };

  const closeEditModal = (open) => {
    setEditHabitTracker(open);

    if (!open) setHabitToEdit(null);
  };

  const programName = sessionData?.program?.name ?? "Program";

  return (
    <>
      {loading && <DashboardLoader />}

      {deleteModal && (
        <DeleteModal
          loading={deleteLoading}
          loadingText="Deleting..."
          setdeleteModal={setDeleteModal}
          onClick={handleDeleteHabit}
          title="Delete Habit"
          details={`Do you really want to delete "${habitToDelete?.habitName ?? "this habit"}"?`}
        />
      )}

      {habitModal && (
        <HabitTrackerModal
          sethabitModal={sethabitModal}
          habit={selectedHabit}
        />
      )}

      {habitTracker && (
        <CreateHabitTrackerModal
          sethabitTracker={sethabitTracker}
          enrollmentId={enrollmentId}
          structureId={structureId}
          options={habitOptions}
          onSuccess={loadHabitTrackerState}
        />
      )}

      {editHabitTracker && habitToEdit && (
        <CreateHabitTrackerModal
          sethabitTracker={closeEditModal}
          enrollmentId={enrollmentId}
          structureId={structureId}
          options={habitOptions}
          onSuccess={loadHabitTrackerState}
          habitId={habitToEdit.id}
          initialHabit={habitToEdit}
        />
      )}

      <div className="dashboard_container">
        <div className="appointes_head_wrapper">
          <div>
            <h2>Habit Tracker</h2>

            {progress?.total_habits != null && (
              <p style={{ margin: "4px 0 0", fontSize: "14px" }}>
                {progress.total_habits} habit
                {progress.total_habits === 1 ? "" : "s"}
                {progress.is_completed ? " · Completed" : ""}
              </p>
            )}

            <small style={{ cursor: "pointer" }}>
              <span onClick={() => navigate("/dashboard/appoinments")}>
                Appointments
              </span>

              {" / "}

              <span
                onClick={() =>
                  navigate(
                    `/dashboard/appoinments/program/${enrollmentId}/session/${sessionId}`,
                  )
                }
              >
                {programName}
              </span>

              {" / "}

              <span>Habit Tracker</span>
            </small>
          </div>

          <div onClick={() => sethabitTracker(true)}>
            <Button children={"Create Habit"} />
          </div>
        </div>

        <div className="table_container">
          <table className="total_table_order_wrapper coaches_table_wrapper">
            <thead>
              <tr>
                <th>Habit Name</th>

                <th>Limits</th>

                <th>Habit type</th>

                <th>Frequency</th>

                <th>Reminder time</th>

                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ padding: "20px 0", textAlign: "center" }}
                  >
                    No habits yet.
                  </td>
                </tr>
              )}

              {data?.map((row, index) => (
                <tr key={row.id}>
                  <td style={{ padding: "20px 0" }}>{row.habitName}</td>

                  <td style={{ padding: "20px 0" }}>{row.limits}</td>

                  <td style={{ padding: "20px 0" }}>{row.createdBy}</td>

                  <td style={{ padding: "20px 0" }}>{row.frequency}</td>

                  <td style={{ padding: "20px 0" }}>{row.reminderTime}</td>

                  <td
                    className="habit-actions-cell"
                    style={{
                      padding: "20px 0",

                      position: "relative",

                      textAlign: "right",
                    }}
                  >
                    <img
                      onClick={(e) => toggleActions(index, e)}
                      src={ellipse}
                      alt="Habit actions"
                      style={{ cursor: "pointer" }}
                    />

                    {openActionIndex === index && (
                      <div
                        className="actions_wrapper"
                        style={{
                          maxWidth: "150px",

                          left: "0%",

                          height: "fit-content",
                        }}
                      >
                        <p onClick={() => openHabitView(row)}>View</p>

                        <p onClick={() => openHabitEdit(row)}>Edit</p>

                        <p onClick={() => openDeleteHabitModal(row)}>Delete</p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination />
      </div>
    </>
  );
};

export default Habitracker;
