import { mockEvents } from './events.mock'

export const timelineData = [
    { time: '00:00', events: 1 },
    { time: '02:00', events: 0 },
    { time: '04:00', events: 0 },
    { time: '06:00', events: 0 },
    { time: '08:00', events: 0 },
    { time: '10:00', events: 2 },
    { time: '12:00', events: 3 },
    { time: '14:00', events: 1 },
    { time: '16:00', events: 0 },
    { time: '18:00', events: 1 },
    { time: '20:00', events: 0 },
    { time: '22:00', events: 1 },
]

const countBySource = (src: string) =>
    mockEvents.filter(e => e.source === src).length

const severityCount = (min: number, max: number) =>
    mockEvents.filter(e => e.severity >= min && e.severity <= max).length

export const mockDashboard = {
    totalEvents: mockEvents.length,

    criticalEvents: mockEvents.filter(e => e.severity >= 8).length,

    topSources: [
        { name: 'sshd', count: countBySource('sshd') },
        { name: 'nginx', count: countBySource('nginx') },
        { name: 'suricata', count: countBySource('suricata') },
    ],

    severityDistribution: {
        low: severityCount(0, 3),
        medium: severityCount(4, 6),
        high: severityCount(7, 8),
        critical: severityCount(9, 10),
    },

    recentEvents: [...mockEvents]
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        )
        .slice(0, 5),
}