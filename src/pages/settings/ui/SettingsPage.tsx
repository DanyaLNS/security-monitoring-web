import { useState } from 'react'
import { Section } from './Section'
import {Toggle} from "./Toggle.tsx";
import {mockSettings, type Settings} from "../../../shared/api/mock/settings.mock.ts";

export const SettingsPage = () => {
    const [settings, setSettings] = useState<Settings>(mockSettings)

    const update = <K extends keyof Settings>(
        key: K,
        value: Settings[K],
    ) => {
        setSettings(prev => ({
            ...prev,
            [key]: value,
        }))
    }

    return (
        <div className="space-y-6">

            {/* CORRELATION ENGINE */}
            <Section title="Correlation Engine">

                <label className="block text-sm mb-1">
                    Time window (minutes)
                </label>

                <input
                    type="number"
                    className="input"
                    value={settings.correlationWindowMinutes}
                    onChange={(e) =>
                        update(
                            'correlationWindowMinutes',
                            Number(e.target.value),
                        )
                    }
                />

                <p className="text-xs text-zinc-500 mt-1">
                    Used for incident grouping logic
                </p>

            </Section>

            {/* ALERT THRESHOLD */}
            <Section title="Alert Thresholds">

                <label className="block text-sm mb-1">
                    Min severity for alert
                </label>

                <input
                    type="number"
                    className="input"
                    value={settings.minSeverityToAlert}
                    onChange={(e) =>
                        update(
                            'minSeverityToAlert',
                            Number(e.target.value),
                        )
                    }
                />

                <p className="text-xs text-zinc-500 mt-1">
                    Events below this level are ignored in alerts
                </p>

            </Section>

            {/* UI SETTINGS */}
            <Section title="UI Preferences">

                <Toggle
                    label="Enable realtime feed"
                    value={settings.enableRealtimeFeed}
                    onChange={(v) => update('enableRealtimeFeed', v)}
                />

                <Toggle
                    label="Compact table mode"
                    value={settings.compactTableMode}
                    onChange={(v) => update('compactTableMode', v)}
                />

            </Section>

            {/* DATA */}
            <Section title="Data Retention">

                <label className="block text-sm mb-1">
                    Retention (days)
                </label>

                <input
                    type="number"
                    className="input"
                    value={settings.retentionDays}
                    onChange={(e) =>
                        update(
                            'retentionDays',
                            Number(e.target.value),
                        )
                    }
                />

            </Section>

            {/* SAVE BUTTON */}
            <div className="flex justify-end">
                <button className="px-4 py-2 bg-green-600 rounded">
                    Save settings
                </button>
            </div>

        </div>
    )
}