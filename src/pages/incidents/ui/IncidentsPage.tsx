import { useEffect, useMemo, useState } from 'react'

import { getSeverityColor } from '../../../shared/lib/severity'
import {
    type EventView,
} from '../../../entities/api/event/types'
import {getIncidentEvents, getIncidents, type IncidentView} from "../../../entities/api/incidents/types.ts";

export const IncidentsPage = () => {
    const [incidents, setIncidents] = useState<IncidentView[]>([])
    const [selected, setSelected] = useState<string | null>(null)
    const [eventsByIncident, setEventsByIncident] = useState<Record<string, EventView[]>>({})

    const [isLoading, setIsLoading] = useState(true)
    const [isEventsLoading, setIsEventsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadIncidents = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getIncidents()
                setIncidents(data)

                if (data.length > 0) {
                    setSelected(data[0].id)
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Не удалось загрузить инциденты'
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadIncidents()
    }, [])

    useEffect(() => {
        if (!selected) {
            return
        }

        if (eventsByIncident[selected]) {
            return
        }

        const loadIncidentEvents = async () => {
            try {
                setIsEventsLoading(true)

                const events = await getIncidentEvents(selected)

                setEventsByIncident((current) => ({
                    ...current,
                    [selected]: events,
                }))
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Не удалось загрузить события инцидента'
                )
            } finally {
                setIsEventsLoading(false)
            }
        }

        loadIncidentEvents()
    }, [selected, eventsByIncident])

    const active = useMemo(() => {
        return incidents.find((incident) => incident.id === selected) ?? null
    }, [incidents, selected])

    const activeEvents = selected ? eventsByIncident[selected] ?? [] : []

    if (isLoading) {
        return (
            <div className="p-4 border border-zinc-800 rounded text-zinc-400">
                Загрузка инцидентов...
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
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
                {incidents.length === 0 && (
                    <div className="p-4 border border-zinc-800 rounded text-zinc-500">
                        Инциденты отсутствуют
                    </div>
                )}

                {incidents.map((incident) => {
                    const isSelected = incident.id === selected

                    return (
                        <div
                            key={incident.id}
                            onClick={() => setSelected(incident.id)}
                            className={[
                                'p-3 bg-zinc-900 border rounded cursor-pointer hover:bg-zinc-800',
                                isSelected
                                    ? 'border-zinc-500'
                                    : 'border-zinc-800',
                            ].join(' ')}
                        >
                            <div className="flex justify-between gap-3">
                                <span className="font-medium truncate">
                                    {incident.title}
                                </span>

                                <span className={getSeverityColor(incident.severity)}>
                                    {incident.severity}
                                </span>
                            </div>

                            <div className="text-xs text-zinc-400 truncate">
                                status: {incident.status}
                            </div>

                            <div className="text-xs text-zinc-500">
                                {incident.eventsCount} events
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="col-span-2">
                {active ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
                            <div className="text-lg font-bold">
                                Incident: {active.title}
                            </div>

                            <div className="text-sm text-zinc-400">
                                Status: {active.status}
                            </div>

                            {active.description && (
                                <div className="text-sm text-zinc-300 mt-2">
                                    {active.description}
                                </div>
                            )}

                            <div className="text-sm mt-2">
                                Events: {active.eventsCount}
                            </div>

                            <div className="text-sm mt-1">
                                Severity:{' '}
                                <span className={getSeverityColor(active.severity)}>
                                    {active.severity}
                                </span>
                            </div>

                            <div className="text-xs text-zinc-500 mt-2">
                                Created: {new Date(active.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div className="space-y-2">
                            {isEventsLoading && (
                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                                    Загрузка событий инцидента...
                                </div>
                            )}

                            {!isEventsLoading && activeEvents.length === 0 && (
                                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-zinc-500">
                                    У инцидента нет связанных событий
                                </div>
                            )}

                            {activeEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="p-3 bg-zinc-900 border border-zinc-800 rounded"
                                >
                                    <div className="flex justify-between gap-4">
                                        <span className="truncate">
                                            {event.title}
                                        </span>

                                        <span className={getSeverityColor(event.severity)}>
                                            {event.severity}
                                        </span>
                                    </div>

                                    <div className="text-xs text-zinc-400">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </div>

                                    <div className="text-xs text-zinc-500">
                                        {event.source} • {event.hostname} • {event.type}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 border border-zinc-800 rounded text-zinc-500">
                        Выберите инцидент
                    </div>
                )}
            </div>
        </div>
    )
}