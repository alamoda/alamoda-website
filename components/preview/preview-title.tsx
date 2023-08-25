import Link from "next/link";

interface TitleCollectionPreviewProps {
    collectionName: string
    collectionURL?: string
}



export default function TitleCollectionPreview({ collectionName, collectionURL }: TitleCollectionPreviewProps) {

    return (
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-4xl tracking-tight text-gray-900 capitalize">{collectionName}</h2>

            {collectionURL &&
                <Link
                    href={collectionURL}
                    className="text-sm font-medium text-gray-900 hover:text-gray-700 hover:underline"
                >
                    Shop the collection
                </Link>
            }

        </div>
    )
}