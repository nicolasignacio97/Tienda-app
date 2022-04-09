///React router
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom"
import { startChecking } from "../actions/auth"
import { AdminScreen } from "../components/admin/AdminScreen"

/// Componentes

import { HomeScreen } from '../components/home/HomeScreen'
import { AuthRuter } from "./AuthRuter"
import { PrivateAdmin } from "./PrivateAdmin"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


export const MainRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid, role } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return <h5>Espere...</h5>
    }
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<PrivateRoute isAuth={!!uid} isAdmin={!!role} />}>
                    <Route exact path='/' element={<HomeScreen />} />
                </Route>
                <Route exact path='/' element={<PrivateAdmin isAdmin={!!role} />}>
                    <Route exact path='/admin/*' element={<AdminScreen />} />
                </Route>
                <Route exact path='/' element={<PublicRoute isAuth={!!uid} />}>
                    <Route path="auth/*" element={<AuthRuter />} />
                </Route>
                <Route path="*" element={<Navigate to='auth/login' />} />
            </Routes>
        </div>
    )
}
