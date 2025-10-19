import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (

        <>
            {user ? <Outlet /> : <Navigate to="/register" />}
        </>
    )
}


export default ProtectedRoutes