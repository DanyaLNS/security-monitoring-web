import { useEffect, useMemo, useState } from 'react'
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

import { KPI } from './KPI'
import { Panel } from './Panel'
import { ThreatTimelineChart } from './ThreatTimelineChart'

import { getSeverityColor } from '../../../shared/lib/severity'
import {type EventView, getEvents} from "../../../entities/api/event/types.ts";

const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444']

const countSeverity = (
    events: EventView[],
    min: number,
    max: number
): number => {
    return events.filter((event) => event.severity >= min && event.severity <= max).length
}

const buildTimelineData = (events: EventView[]) => {
    const buckets = Array.from({ length: 12 }, (_, index) => {
        const hour = index * 2

        return {
            time: `${String(hour).padStart(2, '0')}:00`,
            events: 0,
        }
    })

    for (const event of events) {
        const hour = new Date(event.timestamp).getHours()
        const bucketIndex = Math.floor(hour / 2)

        if (buckets[bucketIndex]) {
            buckets[bucketIndex].events += 1
        }
    }

    return buckets
}

const buildTopSources = (events: EventView[]) => {
    const sourceMap = new Map<string, number>()

    for (const event of events) {
        sourceMap.set(event.source, (sourceMap.get(event.source) ?? 0) + 1)
    }

    return Array.from(sourceMap.entries())
        .map(([name, count]) => ({
            name,
            count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
}

export const DashboardPage = () => {
    const [events, setEvents] = useState<EventView[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getEvents()
                setEvents(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Не удалось загрузить данные dashboard'
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadEvents()
    }, [])

    const dashboard = useMemo(() => {
        const severityDistribution = {
            low: countSeverity(events, 0, 3),
            medium: countSeverity(events, 4, 6),
            high: countSeverity(events, 7, 8),
            critical: countSeverity(events, 9, 10),
        }

        const recentEvents = [...events]
            .sort(
                (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
            )
            .slice(0, 5)

        return {
            totalEvents: events.length,
            criticalEvents: events.filter((event) => event.severity >= 8).length,
            topSources: buildTopSources(events),
            severityDistribution,
            recentEvents,
            timelineData: buildTimelineData(events),
        }
    }, [events])

    const severityData = useMemo(() => {
        return [
            { name: 'Low', value: dashboard.severityDistribution.low },
            { name: 'Medium', value: dashboard.severityDistribution.medium },
            { name: 'High', value: dashboard.severityDistribution.high },
            { name: 'Critical', value: dashboard.severityDistribution.critical },
        ]
    }, [dashboard.severityDistribution])

    if (isLoading) {
        return (
            <div className="p-4 border border-zinc-800 rounded text-zinc-400">
                Загрузка dashboard...
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
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <KPI title="Всего событий" value={dashboard.totalEvents} />
                <KPI title="Критичных событий" value={dashboard.criticalEvents} />
                <KPI title="Высокий уровень угрозы" value={dashboard.severityDistribution.high} />
                <KPI title="Источники" value={dashboard.topSources.length} />
            </div>

            <Panel title="Временная шкала событий">
                <ThreatTimelineChart data={dashboard.timelineData} />
            </Panel>

            <div className="grid grid-cols-2 gap-4">
                <Panel title="Распределение угрозы">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={severityData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                            >
                                {severityData.map((item, index) => (
                                    <Cell
                                        key={item.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Panel>

                <Panel title="Последние события">
                    <div className="space-y-2">
                        {dashboard.recentEvents.length === 0 && (
                            <div className="text-sm text-zinc-500">
                                События отсутствуют
                            </div>
                        )}

                        {dashboard.recentEvents.map((event) => (
                            <div
                                key={event.id}
                                className="p-3 rounded bg-zinc-900 border border-zinc-800"
                            >
                                <div className="flex justify-between gap-4">
                                    <span className="font-medium truncate">
                                        {event.title}
                                    </span>

                                    <span className={getSeverityColor(event.severity)}>
                                        {event.severity}
                                    </span>
                                </div>

                                <div className="text-xs text-zinc-400">
                                    {event.source} • {event.hostname} • {event.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>
        </div>
    )
}