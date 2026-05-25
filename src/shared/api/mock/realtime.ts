import type {MockEvent} from "./events.mock.ts";

const sources = ['sshd', 'nginx', 'suricata']
const types = ['auth_failed', 'network_scan', 'malware']

export const generateEvent = (): MockEvent => {
    const severity = Math.floor(Math.random() * 10)

    return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        title:
            severity > 7
                ? 'Critical security event detected'
                : 'Suspicious activity detected',

        severity,
        type: types[Math.floor(Math.random() * types.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        hostname: `srv-${Math.floor(Math.random() * 5)}`,
        sourceIp: `192.168.0.${Math.floor(Math.random() * 255)}`,
    }
}