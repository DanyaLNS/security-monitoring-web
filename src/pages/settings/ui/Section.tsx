type Props = {
    title: string
    children: React.ReactNode
}

export const Section = ({ title, children }: Props) => {
    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded space-y-3">
            <div className="font-semibold">{title}</div>
            {children}
        </div>
    )
}