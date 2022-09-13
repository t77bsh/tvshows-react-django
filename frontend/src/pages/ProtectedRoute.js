import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function ProtectedRoute() {
    const user = sessionStorage.getItem('user');

    const signedInStatus = () => {
        if (user !== null) {
            return true
        }
        return false
    }

    //if you go admin and you're logged in, take to dashboard

    return (
        signedInStatus() ? <Navigate to='/' /> : <Outlet />
    )
}

export default ProtectedRoute