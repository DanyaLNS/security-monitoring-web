import { useMemo, useState } from 'react'
import {groupIncidents} from "../../../features/incidents/lib/groupIncidents.ts";
import {mockEvents} from "../../../shared/api/mock/events.mock.ts";
import {getSeverityColor} from "../../../shared/lib/severity.ts";

export const IncidentsPage = () => {
    const incidents = useMemo(
        () => groupIncidents(mockEvents),
        [],
    )

    const [selected, setSelected] = useState<string | null>(null)

    const active = incidents.find(i => i.id === selected)

    return (
        <div className="grid grid-cols-3 gap-4">

            {/* INCIDENT LIST */}
            <div className="col-span-1 space-y-2">
                {incidents.map(i => (
                    <div
                        key={i.id}
                        onClick={() => setSelected(i.id)}
                        className="p-3 bg-zinc-900 border border-zinc-800 rounded cursor-pointer hover:bg-zinc-800"
                    >
                        <div className="flex justify-between">
              <span className="font-medium">
                {i.type}
              </span>

                            <span className={getSeverityColor(i.severity)}>
                {i.severity}
              </span>
                        </div>

                        <div className="text-xs text-zinc-400">
                            {i.sourceIp} • {i.hostname}
                        </div>

                        <div className="text-xs text-zinc-500">
                            {i.events.length} events
                        </div>
                    </div>
                ))}
            </div>

            {/* INCIDENT DETAILS */}
            <div className="col-span-2">
                {active ? (
                    <div className="space-y-4">

                        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
                            <div className="text-lg font-bold">
                                Incident: {active.type}
                            </div>

                            <div className="text-sm text-zinc-400">
                                {active.sourceIp} • {active.hostname}
                            </div>

                            <div className="text-sm mt-2">
                                Events: {active.events.length}
                            </div>
                        </div>

                        {/* EVENTS TIMELINE */}
                        <div className="space-y-2">
                            {active.events.map(e => (
                                <div
                                    key={e.id}
                                    className="p-3 bg-zinc-900 border border-zinc-800 rounded"
                                >
                                    <div className="flex justify-between">
                                        <span>{e.title}</span>
                                        <span className={getSeverityColor(e.severity)}>
                      {e.severity}
                    </span>
                                    </div>

                                    <div className="text-xs text-zinc-400">
                                        {new Date(e.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ) : (
                    <div className="text-zinc-500">
                        Select incident
                    </div>
                )}
            </div>

        </div>
    )
}