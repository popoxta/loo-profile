import {Router} from '@remix-run/router'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Landing from "./pages/Landing.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import LooLocator from "./pages/LooLocator.tsx";

const router: Router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<MainLayout/>} id={'root'}>
        <Route index element={<Landing/>}/>
        <Route element={<Dashboard/>}/>
        <Route path={'/loos'}>
            <Route index element={<LooLocator/>}/>
        </Route>
    </Route>
))

export default function App() {
    return <RouterProvider router={router}/>
}

