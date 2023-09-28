import {Router} from '@remix-run/router'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Landing from "./pages/Landing.tsx";
import Dashboard from "./pages/user/Dashboard.tsx";
import LooLocator from "./pages/loos/LooLocator.tsx";
import Loo from "./pages/loos/Loo.tsx";
import Register from "./pages/user/Register.tsx";
import Login from "./pages/user/Login.tsx";
import '../config/firebase-config.ts'
import Logout from "./pages/user/Logout.tsx";
import NotFound from "./pages/NotFound.tsx";
import UserLoos from "./pages/user/UserLoos.tsx";
import AddLoo from "./pages/loos/AddLoo.tsx";
import EditLoo from "./pages/loos/EditLoo.tsx";
import SavedLoos from "./pages/user/SavedLoos.tsx";

export const routes = createRoutesFromElements(
    <Route path={'/'} element={<MainLayout/>} id={'root'}>
        <Route path={'*'} element={<NotFound/>}/>
        <Route index element={<Landing/>}/>
        <Route element={<Dashboard/>}/>
        <Route path={'/loos'}>
            <Route index element={<LooLocator/>}/>
            <Route path={':id'}>
                <Route index element={<Loo/>}/>
                <Route path={'edit'} element={<EditLoo/>}/>
            </Route>
            <Route path={'new'} element={<AddLoo/>}/>
        </Route>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/logout'} element={<Logout/>}/>
        <Route path={'/dashboard'}>
            <Route index element={<Dashboard/>}/>
            <Route path={'loos'} element={<UserLoos/>}/>
            <Route path={'saved'} element={<SavedLoos/>}/>
        </Route>
    </Route>
)

const router: Router = createBrowserRouter(routes)

export default function App() {
    return <RouterProvider router={router}/>
}

