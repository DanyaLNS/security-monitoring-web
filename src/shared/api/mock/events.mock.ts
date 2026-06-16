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

const now = Date.now()

export const mockEvents: MockEvent[] = [
    // SSH brute force cluster
    {
        id: '1',
        timestamp: new Date(now - 1000 * 60 * 2).toISOString(),
        title: 'SSH brute force attempt detected',
        severity: 9,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },
    {
        id: '2',
        timestamp: new Date(now - 1000 * 60 * 3).toISOString(),
        title: 'Repeated SSH authentication failure',
        severity: 8,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },
    {
        id: '3',
        timestamp: new Date(now - 1000 * 60 * 4).toISOString(),
        title: 'Suspicious SSH login pattern',
        severity: 7,
        type: 'auth_failed',
        source: 'sshd',
        hostname: 'server-1',
        sourceIp: '192.168.0.10',
    },

    // Network scan
    {
        id: '4',
        timestamp: new Date(now - 1000 * 60 * 10).toISOString(),
        title: 'Port scan detected from external IP',
        severity: 6,
        type: 'network_scan',
        source: 'suricata',
        hostname: 'fw-1',
        sourceIp: '8.8.8.8',
    },
    {
        id: '5',
        timestamp: new Date(now - 1000 * 60 * 12).toISOString(),
        title: 'High-frequency port probing',
        severity: 5,
        type: 'network_scan',
        source: 'suricata',
        hostname: 'fw-1',
        sourceIp: '8.8.8.8',
    },

    // Web anomalies
    {
        id: '6',
        timestamp: new Date(now - 1000 * 60 * 20).toISOString(),
        title: 'Suspicious HTTP request pattern',
        severity: 4,
        type: 'http_anomaly',
        source: 'nginx',
        hostname: 'api-gateway',
        sourceIp: '10.0.0.5',
    },
    {
        id: '7',
        timestamp: new Date(now - 1000 * 60 * 25).toISOString(),
        title: 'Possible injection attempt blocked',
        severity: 8,
        type: 'http_attack',
        source: 'nginx',
        hostname: 'api-gateway',
        sourceIp: '10.0.0.5',
    },

    // Low noise
    {
        id: '8',
        timestamp: new Date(now - 1000 * 60 * 30).toISOString(),
        title: 'Normal health check request',
        severity: 1,
        type: 'health_check',
        source: 'nginx',
        hostname: 'api-gateway',
        sourceIp: '127.0.0.1',
    },
]