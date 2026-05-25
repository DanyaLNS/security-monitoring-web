type Props = {
    label: string
    value: boolean
    onChange: (v: boolean) => void
}

export const Toggle = ({ label, value, onChange }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm">{label}</span>

            <button
                onClick={() => onChange(!value)}
                className={`w-10 h-5 rounded-full transition ${
                    value ? 'bg-green-500' : 'bg-zinc-700'
                }`}
            >
                <div
                    className={`w-4 h-4 bg-white rounded-full transition transform ${
                        value ? 'translate-x-5' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    )
}