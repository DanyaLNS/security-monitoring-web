import { apiGet } from '../../../shared/api/client'

export type ApiEvent = {
    ulid: string
    source_ulid: string
    type_ulid: string
    severity: number
    status: string
    title: string
    source_ip: string | null
    destination_ip: string | null
    hostname: string | null
    occurred_at: string
    raw_payload: string | null
    normalized_payload: string | null
    created_at: string
    updated_at: string
}

export type EventView = {
    id: string
    timestamp: string
    title: string
    severity: number
    status: string
    type: string
    source: string
    hostname: string
    sourceIp: string
}

export type GetEventsParams = {
    severity?: number | null
    status?: string | null
    typeUlid?: string | null
    sourceUlid?: string | null
    from?: string | null
    to?: string | null
    hostname?: string | null
    sourceIp?: string | null
}

export function mapApiEventToView(event: ApiEvent): EventView {
    return {
        id: event.ulid,
        timestamp: event.occurred_at,
        title: event.title,
        severity: event.severity,
        status: event.status,
        type: event.status,
        source: event.source_ip ?? '-',
        hostname: event.hostname ?? '—',
        sourceIp: event.source_ip ?? '—',
    }
}

export async function getEvents(
    params: GetEventsParams = {}
): Promise<EventView[]> {
    const searchParams = new URLSearchParams()

    if (params.severity !== null && params.severity !== undefined) {
        searchParams.set('severity', String(params.severity))
    }

    if (params.status) {
        searchParams.set('status', params.status)
    }

    if (params.typeUlid) {
        searchParams.set('type_ulid', params.typeUlid)
    }

    if (params.sourceUlid) {
        searchParams.set('source_ulid', params.sourceUlid)
    }

    if (params.from) {
        searchParams.set('from', params.from)
    }

    if (params.to) {
        searchParams.set('to', params.to)
    }

    if (params.hostname) {
        searchParams.set('hostname', params.hostname)
    }

    if (params.sourceIp) {
        searchParams.set('source_ip', params.sourceIp)
    }

    const query = searchParams.toString()

    const path = query
        ? `/api/core/v1/events?${query}`
        : '/api/core/v1/events'

    const events = await apiGet<ApiEvent[]>(path)

    return events.map(mapApiEventToView)
}