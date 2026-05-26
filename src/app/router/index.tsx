import {
    createBrowserRouter,
} from 'react-router-dom'
import {AppLayout} from "../layout/AppLayout.tsx";
import {DashboardPage} from "../../pages/dashboard/ui/DashboardPage.tsx";
import {EventsPage} from "../../pages/events/ui/EventsPage.tsx";
import {IncidentsPage} from "../../pages/incidents/ui/IncidentsPage.tsx";
import {SourcesPage} from "../../pages/sources/ui/SourcesPage.tsx";

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
            {
                path: 'incidents',
                element: <IncidentsPage />,
            },
            {
                path: 'sources',
                element: <SourcesPage />,
            },
        ],
    },
])