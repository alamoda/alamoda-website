import PhotoInput from "@/app/components/PhotoInput";
import PriceInput from "@/app/components/PriceInput";
import PrimaryButton from "@/app/components/PrimaryButton";
import PrimaryInput from "@/app/components/PrimaryInput";
import TextAreaInput from "@/app/components/TextAreaInput";

export default function Page() {
    return (
        <div className='bg-white'>
            <div className="px-4">
                <div className='text-xl font-bold pb-2'>
                    New Product
                </div>
                <PrimaryInput label="Name" placeholder="Name" />
                <TextAreaInput label="Description" />
                <PhotoInput text="Product Photo" />
                <PriceInput />
                <PrimaryButton text="Create" />
            </div>
        </div>
    )
}