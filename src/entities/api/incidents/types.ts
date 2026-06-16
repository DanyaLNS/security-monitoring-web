import { apiGet, apiPost } from '../../../shared/api/client'
import type { EventView } from '../event/types'
import { mapApiEventToView } from '../event/types'

export type ApiIncident = {
    ulid: string
    title: string
    description: string | null
    severity: number
    status: string
    events_count: number
    created_at: string
    updated_at: string
}

export type IncidentView = {
    id: string
    title: string
    description: string | null
    severity: number
    status: string
    eventsCount: number
    createdAt: string
    updatedAt: string
}

export type CreateIncidentBody = {
    title: string
    description?: string | null
    severity: number
    status?: string
    event_ulids?: string[]
}

export function mapApiIncidentToView(incident: ApiIncident): IncidentView {
    return {
        id: incident.ulid,
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status,
        eventsCount: incident.events_count,
        createdAt: incident.created_at,
        updatedAt: incident.updated_at,
    }
}

export async function getIncidents(): Promise<IncidentView[]> {
    const incidents = await apiGet<ApiIncident[]>('/api/core/v1/incidents')

    return incidents.map(mapApiIncidentToView)
}

export async function getIncidentEvents(
    incidentId: string
): Promise<EventView[]> {
    const events = await apiGet<unknown[]>(
        `/api/core/v1/incidents/${incidentId}/events`
    )

    return events.map((event) => mapApiEventToView(event as never))
}

export async function createIncident(
    body: CreateIncidentBody
): Promise<IncidentView> {
    const incident = await apiPost<ApiIncident, CreateIncidentBody>(
        '/api/core/v1/incidents',
        body
    )

    return mapApiIncidentToView(incident)
}