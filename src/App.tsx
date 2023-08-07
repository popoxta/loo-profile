import {Router} from '@remix-run/router'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Home from "./pages/Home.tsx";

const router: Router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<MainLayout/>} id={'root'}>
        <Route index element={<Home/>}/>
    </Route>
))

export default function App() {
    return <RouterProvider router={router}/>
}

