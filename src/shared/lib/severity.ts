export const getSeverityColor = (s: number) => {
    if (s >= 8) return 'text-red-500'
    if (s >= 6) return 'text-orange-400'
    if (s >= 3) return 'text-yellow-400'
    return 'text-green-400'
}