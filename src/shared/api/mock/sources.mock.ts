export type Source = {
    id: string
    name: string
    type: 'nginx' | 'sshd' | 'suricata' | 'custom'
    status: 'active' | 'inactive'
    eventsCount: number
    lastSeen: string
}

export const mockSources: Source[] = [
    {
        id: '1',
        name: 'SSH Server Logs',
        type: 'sshd',
        status: 'active',
        eventsCount: 120,
        lastSeen: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'NGINX Gateway',
        type: 'nginx',
        status: 'active',
        eventsCount: 340,
        lastSeen: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'IDS Sensor',
        type: 'suricata',
        status: 'inactive',
        eventsCount: 45,
        lastSeen: new Date().toISOString(),
    },
]