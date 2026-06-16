import {apiGet} from "../../../shared/api/client.ts";

export type ApiSource = {
    ulid: string
    name: string
    description: string | null
    status: 'active' | 'inactive'
    events_count: number
    last_seen: string | null
    created_at: string
}

export type SourceView = {
    id: string
    name: string
    type: string
    status: 'active' | 'inactive'
    eventsCount: number
    lastSeen: string | null
    description: string | null
}


export function mapApiSourceToView(source: ApiSource): SourceView {
    return {
        id: source.ulid,
        name: source.description ?? source.name,
        type: source.name,
        status: source.status,
        eventsCount: source.events_count,
        lastSeen: source.last_seen,
        description: source.description,
    }
}

export async function getSources(): Promise<SourceView[]> {
    const sources = await apiGet<ApiSource[]>('/api/core/v1/sources')

    return sources.map(mapApiSourceToView)
}