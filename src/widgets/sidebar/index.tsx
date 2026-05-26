import { NavLink } from 'react-router-dom'

const links = [
    {
        to: '/',
        label: 'Dashboard',
    },
    {
        to: '/events',
        label: 'Events',
    },
    {
        to: '/incidents',
        label: 'Incidents',
    },
    {
        to: '/sources',
        label: 'Sources',
    },
]

export const Sidebar = () => {
    return (
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900">
            <div className="p-6 text-xl font-bold">
                Security Monitor
            </div>

            <nav className="flex flex-col gap-1 px-3">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                            `
              rounded-lg px-4 py-3 transition
              ${isActive
                                ? 'bg-zinc-800 text-white'
                                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }
              `
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}