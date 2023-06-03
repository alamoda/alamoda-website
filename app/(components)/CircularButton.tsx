import { PlusIcon } from '@heroicons/react/20/solid'

export default function CircularButton() {
    return (
        <>
            <button
                type="button"
                className="rounded-full p-1 border border-gray-700 hover:border-black"
            >
                <PlusIcon className="h-3 w-3" aria-hidden="true" />
            </button>
        </>
    )
}