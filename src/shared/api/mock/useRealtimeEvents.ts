import { useEffect, useState } from 'react'
import type {MockEvent} from "./events.mock.ts";
import {generateEvent} from "./realtime.ts";

export const useRealtimeEvents = () => {
    const [events, setEvents] = useState<MockEvent[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const event = generateEvent()

            setEvents(prev => [event, ...prev].slice(0, 50))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    return events
}