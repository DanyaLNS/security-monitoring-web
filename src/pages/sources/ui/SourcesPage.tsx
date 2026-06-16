import { useEffect, useMemo, useState } from 'react'
import {getSources, type SourceView} from "../../../entities/api/source/types.ts";

export const SourcesPage = () => {
    const [sources, setSources] = useState<SourceView[]>([])
    const [search, setSearch] = useState('')

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadSources = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getSources()
                setSources(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Не удалось загрузить источники'
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadSources()
    }, [])

    const filtered = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        if (!normalizedSearch) {
            return sources
        }

        return sources.filter((source) => {
            return (
                source.name.toLowerCase().includes(normalizedSearch) ||
                source.type.toLowerCase().includes(normalizedSearch) ||
                source.status.toLowerCase().includes(normalizedSearch) ||
                source.description?.toLowerCase().includes(normalizedSearch)
            )
        })
    }, [sources, search])

    if (isLoading) {
        return (
            <div className="p-4 border border-zinc-800 rounded text-zinc-400">
                Загрузка источников...
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 border border-red-900 bg-red-950/30 rounded text-red-400">
                {error}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <input
                    className="w-full max-w-md p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Искать источники..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                {/* <button className="px-4 py-2 bg-green-600 rounded text-white">
                    + Add Source
                </button> */}
            </div>

            <div className="border border-zinc-800 rounded overflow-hidden">
                <div className="grid grid-cols-5 bg-zinc-900 p-3 text-sm text-zinc-400">
                    <div>Название</div>
                    <div>Тип</div>
                    <div>Статус</div>
                    <div>События</div>
                    <div>Последнее событие</div>
                </div>

                {filtered.length === 0 && (
                    <div className="p-4 text-zinc-500">
                        Источники не найдены
                    </div>
                )}

                {filtered.map((source) => (
                    <div
                        key={source.id}
                        className="grid grid-cols-5 p-3 border-t border-zinc-800 hover:bg-zinc-900"
                    >
                        <div className="font-medium truncate">
                            {source.name}
                        </div>

                        <div className="text-zinc-400 truncate">
                            {source.type}
                        </div>

                        <div>
                            <span
                                className={
                                    source.status === 'active'
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                }
                            >
                                {source.status}
                            </span>
                        </div>

                        <div className="text-zinc-400">
                            {source.eventsCount}
                        </div>

                        <div className="text-zinc-500 text-xs">
                            {source.lastSeen
                                ? new Date(source.lastSeen).toLocaleString()
                                : '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}