import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryRouter, MemoryRouter, RouterProvider} from 'react-router-dom'
import {routes} from "../src/App";
import {ReactElement} from "react";

export function renderApp(location: string){
    const router = createMemoryRouter(routes, {
        initialEntries: [location]
    })
    render(<RouterProvider router={router}/>)
}

export function renderComponent(components: ReactElement[]) {
    render(<MemoryRouter>{...components}</MemoryRouter>)
}

export function setupUser() {
    return userEvent.setup()
}