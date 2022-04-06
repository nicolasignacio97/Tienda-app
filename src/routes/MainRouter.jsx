///React router
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom"
import { startChecking } from "../actions/auth"

/// Componentes
import { HomeScreen } from '../components/home/HomeScreen'
import { AuthRuter } from "./AuthRuter"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"


export const MainRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])


    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
        <div>
            <Routes>
                <Route exact path='/' element={<PrivateRoute isAuth={!!uid} />}>
                    <Route exact path='/' element={<HomeScreen />} />
                </Route>
                <Route exact path='/' element={<PublicRoute isAuth={!!uid} />}>
                    <Route path="auth/*" element={<AuthRuter />} />
                </Route>
                <Route path="*" element={<Navigate to='auth/login' />} />
            </Routes>
        </div>
    )
}
