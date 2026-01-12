import React from 'react'
import Navbar from '../Layout/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Layout/Footer/Footer'
import Sidebar from '../Layout/Sidebar/Sidebar.jsx'
import '../view/Dashboard/Dashboard.css'
const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className='dashboard_content_wrapper'>
                <Sidebar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout
