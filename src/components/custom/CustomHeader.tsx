
interface Props {
    title: string;
    description?: string;
}

export const CustomHeader = ({ title, description }: Props) => {
    return (
        <div className="text-center mb-5 py-2">
            <h1 className="h-15 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                { title }
            </h1>
            {
                description && <p className="text-gray-600 text-lg">{ description }</p>
            }
        </div>
    )
}
