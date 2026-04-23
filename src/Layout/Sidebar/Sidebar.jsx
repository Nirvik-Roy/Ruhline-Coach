import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import dashboardIcon from '../../assets/Capa_1 (2).svg'
import settings from '../../assets/Capa_1 (4).svg'
import kingIcon from '../../assets/svg3186 (1).svg'
const Sidebar = () => {
    return (
        <>
            <div className='sidebar_Wrapper'>
                <NavLink to={'/'} end>
                    <img src={dashboardIcon} />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={'/dashboard/program'}>
                    <img src={settings} />
                    <p>Programs</p>
                </NavLink>

                <NavLink to={'/dashboard/appoinments'}>
                    <img src={settings} />
                    <p>Appointments</p>
                </NavLink>


                <NavLink to={'/dashboard/payouts'}>
                    <img src={kingIcon} />
                    <p>Payouts</p>
                </NavLink>

                <NavLink to={'/dashboard/support'}>
                    <img src={settings} />
                    <p>Support</p>
                </NavLink>
            </div>
        </>
    )
}

export default Sidebar
