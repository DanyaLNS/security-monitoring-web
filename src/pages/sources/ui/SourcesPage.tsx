import { useMemo, useState } from 'react'
import {mockSources} from "../../../shared/api/mock/sources.mock.ts";

export const SourcesPage = () => {
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        return mockSources.filter(s =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.type.toLowerCase().includes(search.toLowerCase())
        )
    }, [search])

    return (
        <div className="space-y-4">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <input
                    className="w-full max-w-md p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Search sources..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="px-4 py-2 bg-green-600 rounded text-white">
                    + Add Source
                </button>
            </div>

            {/* TABLE */}
            <div className="border border-zinc-800 rounded overflow-hidden">

                <div className="grid grid-cols-5 bg-zinc-900 p-3 text-sm text-zinc-400">
                    <div>Name</div>
                    <div>Type</div>
                    <div>Status</div>
                    <div>Events</div>
                    <div>Last Seen</div>
                </div>

                {filtered.map(s => (
                    <div
                        key={s.id}
                        className="grid grid-cols-5 p-3 border-t border-zinc-800 hover:bg-zinc-900"
                    >
                        <div className="font-medium">{s.name}</div>

                        <div className="text-zinc-400">{s.type}</div>

                        <div>
              <span
                  className={
                      s.status === 'active'
                          ? 'text-green-400'
                          : 'text-red-400'
                  }
              >
                {s.status}
              </span>
                        </div>

                        <div className="text-zinc-400">
                            {s.eventsCount}
                        </div>

                        <div className="text-zinc-500 text-xs">
                            {new Date(s.lastSeen).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}