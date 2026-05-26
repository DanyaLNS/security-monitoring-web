import { mockEvents } from './events.mock'

export const mockDashboard = {
    totalEvents: mockEvents.length,

    criticalEvents: mockEvents.filter(e => e.severity >= 8).length,

    topSources: [
        { name: 'sshd', count: 12 },
        { name: 'nginx', count: 7 },
        { name: 'suricata', count: 4 },
    ],

    severityDistribution: {
        low: 5,
        medium: 3,
        high: 2,
        critical: 1,
    },

    recentEvents: mockEvents,
}

export const timelineData = [
    { time: '00:00', events: 4 },
    { time: '02:00', events: 7 },
    { time: '04:00', events: 2 },
    { time: '06:00', events: 12 },
    { time: '08:00', events: 9 },
    { time: '10:00', events: 15 },
    { time: '12:00', events: 20 },
    { time: '14:00', events: 18 },
    { time: '16:00', events: 11 },
    { time: '18:00', events: 14 },
    { time: '20:00', events: 8 },
    { time: '22:00', events: 5 },
]