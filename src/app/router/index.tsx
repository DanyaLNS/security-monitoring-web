import {
    createBrowserRouter,
} from 'react-router-dom'
import {AppLayout} from "../layout/AppLayout.tsx";
import {DashboardPage} from "../../pages/Dashboard.tsx";
import {EventsPage} from "../../pages/Events.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: 'events',
                element: <EventsPage />,
            },
        ],
    },
])