import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import {AppProvider} from "./app/provider/AppProvider.tsx";
import {router} from "./app/router";


ReactDOM.createRoot(
    document.getElementById('root')!,
).render(
    <AppProvider>
        <RouterProvider router={router} />
    </AppProvider>,
)