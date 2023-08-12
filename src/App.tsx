import {Router} from '@remix-run/router'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Landing from "./pages/Landing.tsx";

const router: Router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<MainLayout/>} id={'root'}>
        <Route index element={<Landing/>}/>
    </Route>
))

export default function App() {
    return <RouterProvider router={router}/>
}

