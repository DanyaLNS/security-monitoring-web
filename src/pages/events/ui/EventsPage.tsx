import { useEffect, useMemo, useState } from 'react'

import { getSeverityColor } from '../../../shared/lib/severity'
import {type EventView, getEvents} from "../../../entities/api/event/types.ts";

export const EventsPage = () => {
    const [events, setEvents] = useState<EventView[]>([])
    const [search, setSearch] = useState('')
    const [severity, setSeverity] = useState<number | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getEvents({
                    severity,
                })

                setEvents(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Не удалось загрузить события'
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadEvents()
    }, [severity])

    const filtered = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        if (!normalizedSearch) {
            return events
        }

        return events.filter((event) => {
            return (
                event.title.toLowerCase().includes(normalizedSearch) ||
                event.hostname.toLowerCase().includes(normalizedSearch) ||
                event.source.toLowerCase().includes(normalizedSearch) ||
                event.type.toLowerCase().includes(normalizedSearch) ||
                event.sourceIp.toLowerCase().includes(normalizedSearch)
            )
        })
    }, [events, search])

    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <input
                    className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded"
                    placeholder="Искать события..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    className="p-2 bg-zinc-900 border border-zinc-800 rounded"
                    value={severity ?? ''}
                    onChange={(event) =>
                        setSeverity(
                            event.target.value
                                ? Number(event.target.value)
                                : null
                        )
                    }
                >
                    <option value="">Все</option>
                    <option value="3">Низкие (3+)</option>
                    <option value="6">Средние (6+)</option>
                    <option value="8">Высокие (8+)</option>
                </select>
            </div>

            {isLoading && (
                <div className="p-4 border border-zinc-800 rounded text-zinc-400">
                    Загрузка событий...
                </div>
            )}

            {error && (
                <div className="p-4 border border-red-900 bg-red-950/30 rounded text-red-400">
                    {error}
                </div>
            )}

            {!isLoading && !error && (
                <div className="border border-zinc-800 rounded overflow-hidden">
                    <div className="grid grid-cols-6 bg-zinc-900 p-3 text-sm text-zinc-400">
                        <div>Время</div>
                        <div>Угроза</div>
                        <div>Название</div>
                        <div>Тип</div>
                        <div>Источник</div>
                        <div>Хост</div>
                    </div>

                    {filtered.length === 0 && (
                        <div className="p-4 text-zinc-500">
                            События не найдены
                        </div>
                    )}

                    {filtered.map((event) => (
                        <div
                            key={event.id}
                            className="grid grid-cols-6 p-3 border-t border-zinc-800 hover:bg-zinc-900 cursor-pointer"
                        >
                            <div className="text-xs text-zinc-400">
                                {new Date(event.timestamp).toLocaleTimeString()}
                            </div>

                            <div className={getSeverityColor(event.severity)}>
                                {event.severity}
                            </div>

                            <div className="font-medium truncate">
                                {event.title}
                            </div>

                            <div className="text-zinc-400 truncate">
                                {event.type}
                            </div>

                            <div className="text-zinc-400 truncate">
                                {event.source}
                            </div>

                            <div className="text-zinc-400 truncate">
                                {event.hostname}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}