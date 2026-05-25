type Props = {
    title: string
    children: React.ReactNode
}

export const Panel = ({ title, children }: Props) => {
    return (
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="mb-3 font-semibold">{title}</div>
            {children}
        </div>
    )
}