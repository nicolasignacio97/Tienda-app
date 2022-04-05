///React router
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom"

/// Componentes
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { HomeScreen } from '../components/home/HomeScreen'

export const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registro" element={<RegisterScreen />} />
            <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
    )
}
