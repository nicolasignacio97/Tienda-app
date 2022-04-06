import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = ({ isAuth }) => {
    return isAuth ? <Navigate to="/" /> : <Outlet />;
}