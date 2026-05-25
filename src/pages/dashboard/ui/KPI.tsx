type Props = {
    title: string
    value: number
}

export const KPI = ({ title, value }: Props) => {
    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-sm text-zinc-400">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    )
}