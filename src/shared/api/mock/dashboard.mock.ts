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