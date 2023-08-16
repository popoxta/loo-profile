import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import {routes} from "../src/App";

export function renderApp(location: string){
    const user = userEvent.setup()
    const router = createMemoryRouter(routes, {
        initialEntries: [location]
    })
    const container = render(<RouterProvider router={router}/>)
    return {user, ...container}
}