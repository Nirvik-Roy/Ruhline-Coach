import './AppoinmentCalendar.css'
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useNavigate } from "react-router-dom";
import AppoinmentViewModal from '../../../Modal/AppoinmentViewModal.jsx'
import AddBreakModal from '../../../Modal/AddBreakModal.jsx';
import WorkingHoursModal from '../../../Modal/WorkingHoursModal.jsx';
import { getCoachAppoinments } from '../../../../utils/Program.js';
import Loaders from '../../../../Components/Loaders/Loaders.jsx'
import { toLocalDateTime } from '../../../../utils/dateUtils'
const AppoinmentCalendar = () => {
    const calendarComponentRef = useRef(null);
    const navigate = useNavigate();
    const [showModal, setshowModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [eventId, seteventId] = useState(false)
    const [events, setEvents] = useState([]);

    const fetchAppoinments = async () => {
        setloading(true)
        const res = await getCoachAppoinments()
        if (res?.success) {
            const mapped = res?.data?.events.map((ev) => ({
                id: ev?.id,
                title: ev?.title,
                start: ev?.start_at,   // FullCalendar needs "start"
                end: ev?.end_at,       // FullCalendar needs "end"
                extendedProps: {
                    status: ev?.status,
                    sessionNumber: ev?.session_number,
                    enrollmentId: ev?.enrollment_id,
                    program: ev?.program,
                    customer: ev?.customer,
                    coachAttendUrl: ev?.coach_attend_url,
                    programDashboardUrl: ev?.program_dashboard_url,
                }
            })) || []
            setEvents(mapped || [])
        }
        setloading(false)
    }
    useEffect(() => {
        fetchAppoinments()
    }, [])
    // const handleDateClick = (arg) => {
    //     alert(arg.dateStr);
    // };

    // const handleSelectedDates = (info) => {
    //     alert("selected " + info.startStr + " to " + info.endStr);
    //     console.log(info.startStr, info.endStr)
    //     const title = prompt("What's the name of the title?");
    //     if (title) {
    //         const newEvent = {
    //             title,
    //             start: info.startStr,
    //             end: info.endStr,
    //             status: 'upcoming'
    //         };

    //         setEvents((prev) => [...prev, newEvent]);
    //         console.log("New events list:", [...events, newEvent]);
    //     }
    // };

    const handleNavigation = (info) => {
        // navigate(`/dashboard/calendar/programs/${info.dateStr}`)
        seteventId(info?.event?.id)
        setshowModal(true)
    }
    return (
        <>
            {loading && <Loaders />}
            {showModal && <AppoinmentViewModal eventId={eventId} events={events} setshowModal={setshowModal} />}
            <div className="claendar_wrappr553">
                <div className='claender_status_wrapper'>
                    <div className='clendar_upcoming'>
                        <div style={{
                            width: '17px',
                            height: '17px',
                            borderRadius: '3px',
                            background: 'rgba(206, 115, 86, 1)',
                        }} className='small_box456'></div>
                        <p>Upcoming</p>
                    </div>

                    <div className='clendar_upcoming'>
                        <div style={{
                            width: '17px',
                            height: '17px',
                            borderRadius: '3px',
                            background: 'rgba(206, 114, 86, 0.588)',
                        }} className='small_box456'></div>
                        <p>Completed</p>
                    </div>

                    <div className='clendar_upcoming'>
                        <div style={{
                            width: '17px',
                            height: '17px',
                            borderRadius: '3px',
                            background: 'rgba(206, 114, 86, 0.251)',
                        }} className='small_box456'></div>
                        <p>Cancelled</p>
                    </div>
                </div>
                <FullCalendar
                    timeZone="Asia/Kolkata"
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    ref={calendarComponentRef}
                    initialView="timeGridWeek"
                    // dateClick={handleDateClick}
                    headerToolbar={{
                        // right: "prev,next today",
                        // center: "title",
                        // right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        right: '',
                        left: 'prev title today next'
                    }}
                    selectable={true}
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        resourceTimeGridPlugin,
                    ]}
                    eventClick={(event) => {
                        handleNavigation(event)
                    }}
                    events={events}
                    eventClassNames={(arg) => {
                        const status = arg?.event?.extendedProps?.status;
                        if (status === "Upcoming") return ["fc-event-upcoming"];
                        if (status === "Completed") return ["fc-event-completed"];
                        if (status === "Cancelled") return ["fc-event-cancelled"];
                        return [];
                    }}


                    // select={handleSelectedDates}
                    // eventLimit={3}
                    dayHeaderContent={(args) => {
                        // count events for this date
                        const dateStr = args?.date?.toISOString()?.split("T")[0];

                        const count = events?.filter(
                            (ev) => ev?.start?.split("T")[0] === dateStr
                        ).length;

                        return (
                            <>
                                <div>{args?.text}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-color)", fontWeight: '500', marginTop: '10px' }}>
                                    {count} task{count !== 1 ? "(s)" : "(s)"}
                                </div>
                            </>
                        );
                    }}
                />
            </div>
        </>
    )
}

export default AppoinmentCalendar
