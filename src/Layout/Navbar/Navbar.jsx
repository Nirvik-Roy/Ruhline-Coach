import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Frame 1984078480.svg'
import user from '../../assets/g10332.svg'
import logout from '../../assets/Group (1).svg'
import { useDispatch, useSelector } from 'react-redux'
import { AuthlogOut } from '../../Store/Slices/Loginslice/AuthSlice'
import Loaders from '../../Components/Loaders/Loaders'
const Navbar = () => {
    const [dropdown, setdropdown] = useState(false);
    const {isLoading} = useSelector(state=>state.auth)
    const [modalOpen, setmodalOpen] = useState({
        password: false,
        profile: false,
        name: false
    })
    const dispatch = useDispatch()
    const modalFunction = (id) => {
        setmodalOpen({
            password: id == 3 ? true : false,
            profile: id == 2 ? true : false,
            name: id == 1 ? true : false
        })
    }
    const logoutFunction = () =>{
         dispatch(AuthlogOut())
    } 
    return (
        <>
            {isLoading && <Loaders/>}
            {/* {modalOpen.password && <ChangePasswordModal  modalFunction={modalFunction}/>}
            {modalOpen.profile && <ChangeProfileModal modalFunction={modalFunction}/>}
            {modalOpen.name && <UpdateName modalFunction={modalFunction}/>} */}
            <div className='navbar_wrapper'>
                <div className='container navbar_content_wrapper'>
                    <img src={logo} />

                    <div className='navbar_logout_wrapper'>
                        <img onClick={(() => { setdropdown(!dropdown) })} src={user} />
                        <img onClick={(() => logoutFunction())} src={logout} />
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
