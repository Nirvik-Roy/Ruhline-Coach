import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Frame 1984078480.svg'
import user from '../../assets/g10332.svg'
import logout from '../../assets/Group (1).svg'
const Navbar = () => {
    const [dropdown, setdropdown] = useState(false);
    const [modalOpen, setmodalOpen] = useState({
        password: false,
        profile: false,
        name: false
    })
    const modalFunction = (id) => {
        setmodalOpen({
            password: id == 3 ? true : false,
            profile: id == 2 ? true : false,
            name: id == 1 ? true : false
        })
    }
    return (
        <>
            {/* {modalOpen.password && <ChangePasswordModal  modalFunction={modalFunction}/>}
            {modalOpen.profile && <ChangeProfileModal modalFunction={modalFunction}/>}
            {modalOpen.name && <UpdateName modalFunction={modalFunction}/>} */}
            <div className='navbar_wrapper'>
                <div className='container navbar_content_wrapper'>
                    <img src={logo} />

                    <div className='navbar_logout_wrapper'>
                        <img onClick={(() => { setdropdown(!dropdown) })} src={user} />
                        <img src={logout} />
                        {dropdown && <div className='user_dropdown'>
                            <div className='user_square'></div>
                            <p onClick={(() => modalFunction(1))}>Update Name</p>
                            <p onClick={(() => modalFunction(2))}>Change Profile Picture</p>
                            <p onClick={(() => modalFunction(3))}>Change Password</p>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
