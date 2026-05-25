import type {MockEvent} from "../../../shared/api/mock/events.mock.ts";

export type Incident = {
    id: string
    events: MockEvent[]
    severity: number
    type: string
    sourceIp: string
    hostname: string
    startTime: string
    endTime: string
    title: string
}

const WINDOW_MINUTES = 10

export const groupIncidents = (events: MockEvent[]): Incident[] => {
    const sorted = [...events].sort(
        (a, b) =>
            new Date(a.timestamp).getTime() -
            new Date(b.timestamp).getTime(),
    )

    const incidents: Incident[] = []

    for (const event of sorted) {
        const eventTime = new Date(event.timestamp).getTime()

        const existing = incidents.find(i => {
            const lastEvent = i.events[i.events.length - 1]
            const lastTime = new Date(lastEvent.timestamp).getTime()

            const sameIp = i.sourceIp === event.sourceIp
            const sameHost = i.hostname === event.hostname
            const sameType = i.type === event.type
            const inWindow =
                eventTime - lastTime <= WINDOW_MINUTES * 60 * 1000

            return sameIp && sameHost && sameType && inWindow
        })

        if (existing) {
            existing.events.push(event)
            existing.severity = Math.max(existing.severity, event.severity)
            existing.endTime = event.timestamp
        } else {
            incidents.push({
                id: `${event.id}-incident`,
                events: [event],
                severity: event.severity,
                type: event.type,
                sourceIp: event.sourceIp,
                hostname: event.hostname,
                startTime: event.timestamp,
                endTime: event.timestamp,
                title: event.title,
            })
        }
    }

    return incidents
}