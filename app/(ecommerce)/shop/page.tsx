import { Suspense } from 'react';
import Testimonials from '@/components/testimonials';
import WomenPreview from '@/components/preview/women-preview';
import MenPreview from '@/components/preview/men-preview';
import LifestylePreview from '@/components/preview/lifestyle-preview';
import DepartmentsGrid from '@/components/grid/departments-grid';

export default function ShopPage() {

    return (
        <>
            <DepartmentsGrid />
            <Suspense>
                {/* Preview */}
                <div className="py-24 space-y-24">
                    <WomenPreview />
                    <MenPreview />
                    <LifestylePreview />
                </div>

                <Testimonials />
            </Suspense>
        </>
    )
}