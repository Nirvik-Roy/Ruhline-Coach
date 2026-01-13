import './AppoinmentCalendar.css'
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useNavigate } from "react-router-dom";
import AppoinmentViewModal from '../../../Modal/AppoinmentViewModal.jsx'
import AddBreakModal from '../../../Modal/AddBreakModal.jsx';
import WorkingHoursModal from '../../../Modal/WorkingHoursModal.jsx';
const AppoinmentCalendar = () => {
    const calendarComponentRef = useRef(null);
    const navigate = useNavigate();
    const [events, setEvents] = useState([
        // Completed (before today if your calendar considers Jan 12 as “today”)
        {
            id: 1,
            title: "Morning Standup",
            start: "2026-01-12T09:00:00+05:30",
            end: "2026-01-12T09:30:00+05:30",
            status: "completed",
        },
        {
            id: 2,
            title: "Bug Fix Meeting",
            start: "2026-01-13T11:00:00+05:30",
            end: "2026-01-13T12:00:00+05:30",
            status: "completed",
        },

        // Upcoming (later this week)
        {
            id: 3,
            title: "Design Workshop",
            start: "2026-01-14T14:30:00+05:30",
            end: "2026-01-14T15:30:00+05:30",
            status: "upcoming",
        },
        {
            id: 4,
            title: "Sprint Planning",
            start: "2026-01-15T10:00:00+05:30",
            end: "2026-01-15T11:30:00+05:30",
            status: "upcoming",
        },
        {
            id: 5,
            title: "Code Review",
            start: "2026-01-16T16:00:00+05:30",
            end: "2026-01-16T17:00:00+05:30",
            status: "upcoming",
        },

        // Cancelled (within the same week)
        {
            id: 6,
            title: "Marketing Sync",
            start: "2026-01-17T13:00:00+05:30",
            end: "2026-01-17T14:00:00+05:30",
            status: "cancelled",
        },
        {
            id: 7,
            title: "HR Check-In",
            start: "2026-01-18T10:30:00+05:30",
            end: "2026-01-18T11:00:00+05:30",
            status: "cancelled",
        },
    ]);
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
        if (events[0].start != info.dateStr) {
            return;
        } else {
            navigate(`/dashboard/calendar/programs/${info.dateStr}`)
        }
    }
    return (
        <>
        {/* <AppoinmentViewModal/> */}
        {/* <AddBreakModal/> */}
        {/* <WorkingHoursModal/> */}
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
                        console.log(event.event._def.publicId);
                    }}
                    events={events}
                    eventClassNames={(arg) => {
                        const status = arg.event.extendedProps.status;
                        if (status === "upcoming") return ["fc-event-upcoming"];
                        if (status === "completed") return ["fc-event-completed"];
                        if (status === "cancelled") return ["fc-event-cancelled"];
                        return [];
                    }}


                    // select={handleSelectedDates}
                    // eventLimit={3}
                    dayHeaderContent={(args) => {
                        // count events for this date
                        const dateStr = args.date.toISOString().split("T")[0];

                        const count = events.filter(
                            (ev) => ev.start.split("T")[0] === dateStr
                        ).length;

                        return (
                            <>
                                <div>{args.text}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-color)",fontWeight:'500',marginTop:'10px' }}>
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
