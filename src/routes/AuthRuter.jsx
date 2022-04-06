import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRuter = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/registro" element={<RegisterScreen />} />
                <Route path="*" element={<Navigate to='/login' />} />
            </Routes>
        </div>
    )
}
