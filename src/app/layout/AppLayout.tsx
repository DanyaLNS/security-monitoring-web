import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../widgets/sidebar'


export const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
            <Sidebar />

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}