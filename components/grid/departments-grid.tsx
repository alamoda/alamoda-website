import Image from "next/image"
import Link from "next/link"

import womenPreviewImage from '@/public/women-preview.webp';
import menPreviewImage from '@/public/men-preview.webp';
import lifestylePreviewImage from '@/public/lifestyle-preview.webp';


export default function DepartmentsGrid() {

  const departments_preview = [
    {
      name: "Women",
      src: womenPreviewImage,
      alt: "Woman wearing a white dress posing for the Women collection preview.",
      url: "/shop/women",
    },
    {
      name: "Men",
      src: menPreviewImage,
      alt: "Man walking in the street with a long coat posing for the Men collection preview.",
      url: "/shop/men",
    },
    {
      name: "Lifestyle",
      src: lifestylePreviewImage,
      alt: "A livingroom decorated with Versace items for the Lifestyle collection preview.",
      url: "/shop/lifestyle",
    },
  ];

  return (
    <section className="relative pt-24">
      <h2 className="sr-only">
        Collections
      </h2>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">

        {departments_preview.map((dept) => (
          <div
            key={dept.name}
            className="group relative h-96 bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
          >
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                <Image
                  src={dept.src}
                  alt={dept.alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
            </div>
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                <p aria-hidden="true" className="text-xs text-white">
                  Shop the collection
                </p>
                <h3 className="mt-1 text-sm font-semibold text-white">
                  <Link href={dept.url}>
                    <span className="absolute inset-0" />
                    {dept.name}
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}