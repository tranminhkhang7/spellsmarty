import React from 'react'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
const AdminRouter = ({ children }) => {
    const role = localStorage.getItem('role');
    if (role && role === "Staff") {
        return <>{children}</>
    }
    else {
        return <NotFoundPage />
    }
}

export default AdminRouter;

