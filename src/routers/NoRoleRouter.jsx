import React, { useEffect } from 'react'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { useNavigate } from 'react-router-dom';
const NoRoleRouter = ({ children }) => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
  
    useEffect(() => {
      if (role) {
        navigate('/');
      }
    }, [role, navigate]);
  
    return <>{children}</>;
}

export default NoRoleRouter;

