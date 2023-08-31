import {Router} from '@remix-run/router'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Landing from "./pages/Landing.tsx";
import Dashboard from "./pages/user/Dashboard.tsx";
import LooLocator from "./pages/loos/LooLocator.tsx";
import Loo from "./pages/loos/Loo.tsx";
import Register, {action as registerAction} from "./pages/user/Register.tsx";
import Login, {action as loginAction} from "./pages/user/Login.tsx";
import '../config/firebase-config.ts'
import Logout from "./pages/user/Logout.tsx";
import NotFound from "./pages/NotFound.tsx";
import UserLoos from "./pages/user/UserLoos.tsx";

export const routes = createRoutesFromElements(
    <Route path={'/'} element={<MainLayout/>} id={'root'}>
        <Route path={'*'} element={<NotFound/>}/>
        <Route index element={<Landing/>}/>
        <Route element={<Dashboard/>}/>
        <Route path={'/loos'}>
            <Route index element={<LooLocator/>}/>
            <Route path={':id'} element={<Loo/>}/>
        </Route>
        <Route path={'/register'} element={<Register/>} action={registerAction}/>
        <Route path={'/login'} element={<Login/>} action={loginAction}/>
        <Route path={'/logout'} element={<Logout/>}/>
        <Route path={'/dashboard'}>
            <Route index element={<Dashboard/>}/>
            <Route path={'loos'} element={<UserLoos/>}/>
        </Route>
    </Route>
)

const router: Router = createBrowserRouter(routes)

export default function App() {
    return <RouterProvider router={router}/>
}

