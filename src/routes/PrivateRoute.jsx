import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ isAuth, isAdmin }) => {
    if (isAuth && isAdmin) {
        return <Navigate to='admin' />;
    } else {

        return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
    }
}