import { mockEvents } from './events.mock'

const count = (source: string) =>
    mockEvents.filter(e => e.source === source).length

const lastSeen = (source: string) =>
    mockEvents
        .filter(e => e.source === source)
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        )[0]?.timestamp ?? new Date().toISOString()

export const mockSources = [
    {
        id: '1',
        name: 'SSH Server Logs',
        type: 'sshd',
        status: 'active',
        eventsCount: count('sshd'),
        lastSeen: lastSeen('sshd'),
    },
    {
        id: '2',
        name: 'NGINX Gateway',
        type: 'nginx',
        status: 'active',
        eventsCount: count('nginx'),
        lastSeen: lastSeen('nginx'),
    },
    {
        id: '3',
        name: 'IDS Sensor',
        type: 'suricata',
        status: 'active',
        eventsCount: count('suricata'),
        lastSeen: lastSeen('suricata'),
    },
]