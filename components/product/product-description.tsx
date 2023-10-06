export default function ProductDescription({ description }: { description: string | null }) {

    if (!description) return null;

    return (
        <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <div
                className="text-sm mt-2 text-gray-800"
                dangerouslySetInnerHTML={{ __html: description as string }}
            />
        </div>
    )
}