import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { useMemo, useState } from "react"

type Props = {
    data: { time: string; events: number }[]
}

export const ThreatTimelineChart = ({ data }: Props) => {
    const [range, setRange] = useState<[number, number]>([0, data.length])

    const visibleData = useMemo(() => {
        return data.slice(range[0], range[1])
    }, [data, range])

    return (
        <div className="space-y-3">

            {/* CONTROLS */}
            <div className="flex gap-2 text-xs text-zinc-400">
                <button
                    onClick={() => setRange([0, data.length])}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded"
                >
                    Сбросить
                </button>

                <button
                    onClick={() => setRange([0, Math.floor(data.length / 2)])}
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded"
                >
                    50%
                </button>

                <button
                    onClick={() =>
                        setRange([Math.floor(data.length / 2), data.length])
                    }
                    className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded"
                >
                    Последние 50%
                </button>
            </div>

            {/* CHART */}
            <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibleData}>

                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                        <XAxis
                            dataKey="time"
                            stroke="#71717a"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            stroke="#71717a"
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#18181b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                                color: "#fff",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="events"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}