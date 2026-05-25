export type Settings = {
    correlationWindowMinutes: number
    minSeverityToAlert: number
    enableRealtimeFeed: boolean
    compactTableMode: boolean
    retentionDays: number
}

export const mockSettings: Settings = {
    correlationWindowMinutes: 10,
    minSeverityToAlert: 7,
    enableRealtimeFeed: true,
    compactTableMode: false,
    retentionDays: 30,
}