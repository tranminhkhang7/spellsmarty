import React from 'react'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
const UserRouter = ({ children }) => {
    const role = localStorage.getItem('role');
    if (role ===null || role ===undefined || role === "Free" || role === "Premium" || role === "Staff" || role === "Admin") {
        return <>{children}</>
    }
    else {
        return <NotFoundPage/>
    }
}

export default UserRouter;

