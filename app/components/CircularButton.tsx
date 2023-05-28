import { PlusIcon } from '@heroicons/react/20/solid'

export default function CircularButton() {
    return (
        <>
            <button
                type="button"
                className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PlusIcon className="h-3 w-3" aria-hidden="true" />
            </button>
        </>
    )
}