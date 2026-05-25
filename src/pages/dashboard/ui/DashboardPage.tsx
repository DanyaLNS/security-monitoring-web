import {KPI} from "./KPI.tsx";
import {Panel} from "./Panel.tsx";
import {mockDashboard} from "../../../shared/api/mock/dashboard.mock.ts";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {getSeverityColor} from "../../../shared/lib/severity.ts";

const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444']

export const DashboardPage = () => {
    const {
        totalEvents,
        criticalEvents,
        topSources,
        severityDistribution,
        recentEvents,
    } = mockDashboard

    const severityData = [
        { name: 'Low', value: severityDistribution.low },
        { name: 'Medium', value: severityDistribution.medium },
        { name: 'High', value: severityDistribution.high },
        { name: 'Critical', value: severityDistribution.critical },
    ]

    return (
        <div className="space-y-6">

            {/* KPI */}
            <div className="grid grid-cols-4 gap-4">
                <KPI title="Total Events" value={totalEvents} />
                <KPI title="Critical Events" value={criticalEvents} />
                <KPI title="High Severity" value={severityDistribution.high} />
                <KPI title="Sources" value={topSources.length} />
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-2 gap-4">

                <Panel title="Severity Distribution">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={severityData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                            >
                                {severityData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Panel>

                <Panel title="Top Sources">
                    <ul className="space-y-1">
                        {topSources.map(s => (
                            <li key={s.name} className="flex justify-between text-sm">
                                <span>{s.name}</span>
                                <span className="text-zinc-400">{s.count}</span>
                            </li>
                        ))}
                    </ul>
                </Panel>

            </div>
            {/* Recent events */}
            <Panel title="Recent Threat Activity">
                <div className="space-y-2">
                    {recentEvents.map(e => (
                        <div
                            key={e.id}
                            className="p-3 rounded bg-zinc-900 border border-zinc-800"
                        >
                            <div className="flex justify-between">
                                <span className="font-medium">{e.title}</span>
                                <span className={getSeverityColor(e.severity)}>
                  {e.severity}
                </span>
                            </div>

                            <div className="text-xs text-zinc-400">
                                {e.source} • {e.hostname} • {e.type}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>

        </div>
    )
}