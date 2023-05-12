import PrimaryButton from "@/app/components/PrimaryButton";

export default function Page() {
    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold px-4 pb-2'>
                    New Product
                </div>
                <PrimaryButton text="Create" />
            </div>
        </div>
    )
}