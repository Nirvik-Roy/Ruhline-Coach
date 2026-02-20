import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { verifyToken } from '../Store/Slices/Loginslice/AuthSlice';
const PrivateRoute = () => {
    const { isLogin, isChecking } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(verifyToken())
    }, [dispatch])
    
    if (isChecking) {
        return null; // or loader
    }
    return (
        isLogin ? <Outlet /> : <Navigate to='/' replace />
    )
}

export default PrivateRoute
