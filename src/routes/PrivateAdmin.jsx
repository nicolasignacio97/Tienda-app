import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateAdmin = ({ isAdmin }) => {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
}