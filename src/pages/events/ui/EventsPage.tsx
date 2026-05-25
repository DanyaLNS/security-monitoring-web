import { useMemo, useState } from 'react'
import {mockEvents} from "../../../shared/api/mock/events.mock.ts";
import {getSeverityColor} from "../../../shared/lib/severity.ts";

export const EventsPage = () => {
    const [search, setSearch] = useState('')
    const [severity, setSeverity] = useState<number | null>(null)

    const filtered = useMemo(() => {
        return mockEvents.filter(e => {
            const matchSearch =
                e.title.toLowerCase().includes(search.toLowerCase()) ||
                e.hostname.toLowerCase().includes(search.toLowerCase()) ||
                e.source.toLowerCase().includes(search.toLowerCase())

            const matchSeverity = severity ? e.severity >= severity : true

            return matchSearch && matchSeverity
        })
    }, [search, severity])

    return (
        <div className="space-y-4">

            {/* HEADER */}
            <div className="flex gap-4 items-center">
                <input
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="p-2 bg-zinc-900 border border-zinc-800 rounded"
                    onChange={(e) =>
                        setSeverity(e.target.value ? Number(e.target.value) : null)
                    }
                >
                    <option value="">All severity</option>
                    <option value="3">Low (3+)</option>
                    <option value="6">Medium (6+)</option>
                    <option value="8">High (8+)</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="border border-zinc-800 rounded overflow-hidden">

                {/* HEADER ROW */}
                <div className="grid grid-cols-6 bg-zinc-900 p-3 text-sm text-zinc-400">
                    <div>Time</div>
                    <div>Severity</div>
                    <div>Title</div>
                    <div>Type</div>
                    <div>Source</div>
                    <div>Host</div>
                </div>

                {/* ROWS */}
                {filtered.map(e => (
                    <div
                        key={e.id}
                        className="grid grid-cols-6 p-3 border-t border-zinc-800 hover:bg-zinc-900 cursor-pointer"
                    >
                        <div className="text-xs text-zinc-400">
                            {new Date(e.timestamp).toLocaleTimeString()}
                        </div>

                        <div className={getSeverityColor(e.severity)}>
                            {e.severity}
                        </div>

                        <div className="font-medium truncate">
                            {e.title}
                        </div>

                        <div className="text-zinc-400">
                            {e.type}
                        </div>

                        <div className="text-zinc-400">
                            {e.source}
                        </div>

                        <div className="text-zinc-400">
                            {e.hostname}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}