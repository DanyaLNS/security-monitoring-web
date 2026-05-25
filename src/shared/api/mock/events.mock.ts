export type MockEvent = {
    id: string
    timestamp: string
    title: string
    severity: number
    type: string
    source: string
    hostname: string
    sourceIp: string
}

export const mockEvents: MockEvent[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        title: 'SSH failed login',
        severity: 9,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        title: 'SSH failed login',
        severity: 8,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        title: 'SSH failed login',
        severity: 7,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },

    {
        id: '4',
        timestamp: new Date().toISOString(),
        title: 'Port scan detected',
        severity: 6,
        type: 'network_scan',
        source: 'suricata',
        hostname: 'fw-1',
        sourceIp: '8.8.8.8',
    },
]