import Image from "next/image";

import aboutImage1 from '@/public/about1.webp';
import aboutImage2 from '@/public/about2.webp';
import aboutImage3 from '@/public/about3.webp';
import aboutImage4 from '@/public/about4.webp';
import aboutImage5 from '@/public/about5.webp';
import aboutImage6 from '@/public/about6.webp';
import aboutImage7 from '@/public/about7.webp';
import menImage from '@/public/men.webp';

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-60 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="font text-4xl tracking-tight text-gray-900 sm:text-4xl">
                                Welcome to Alamoda
                            </h1>
                            <p className="mt-4 leading-8 text-sm text-gray-800">
                                <span className='font-medium'>
                                    Alamoda is the premier platform for exploring 1000+ of the finest luxury brands at unbeatable prices.
                                </span>
                                {" "}
                                <span>
                                    We have a deep appreciation for the incredible luxury shopping experience Italy has to offer and wanted to share that with the world. Our cutting-edge website allows customers to effortlessly purchase brand-new, in-season, and completely authentic items at the retail price set in Italy, which is usually lower than prices found in the US.
                                </span>
                                <br />
                                <span className='font-medium'>
                                    This translates to a consistent savings of 50 to 60% off US retail prices!
                                </span>
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="relative h-64 w-44 overflow-hidden sm:opacity-0 lg:opacity-100">
                                                    <Image
                                                        src={aboutImage1}
                                                        alt="Woman wearing a By Far bag and a Balmain Fur"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage2}
                                                        alt="Woman wearing a Burberry shirt"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage3}
                                                        alt="Woman showcasing a Bottega Veneta green ba."
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage4}
                                                        alt="Woman wearin a Burberry black bag"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage5}
                                                        alt="Woman wearing Valentino hills"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage6}
                                                        alt="Woman wearing Christian Dior sunglasses"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden">
                                                    <Image
                                                        src={aboutImage7}
                                                        alt="Woman posing and wearing a Palm Angeles pink jacket"
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-4xl tracking-tight text-gray-900">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-sm leading-8 text-gray-800">
                                    <span>
                                        Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                                        eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
                                        Eleifend egestas fringilla sapien.
                                    </span>
                                    <br />
                                    <span>
                                        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed
                                        amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius
                                        sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
                                        Mattis mauris semper sed amet vitae sed turpis id.
                                    </span>
                                    <br />
                                    <span>
                                        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie
                                        auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et
                                        ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                                    </span>
                                </p>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-sm text-gray-800">Luxury fashion sales</dt>
                                        <dd className="text-4xl tracking-tight text-gray-900">44 million</dd>
                                    </div>
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-sm text-gray-800">US Luxury fashion sales</dt>
                                        <dd className="text-4xl tracking-tight text-gray-900">$50 billion</dd>
                                    </div>
                                    <div className="flex flex-col-reverse gap-y-4">
                                        <dt className="text-sm text-gray-800">Americans overpaid luxury</dt>
                                        <dd className="text-4xl tracking-tight text-gray-900">$20 billion</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

            {/* Banner */}
            < div className="bg-white" >
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="relative overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src={menImage}
                                alt="A man laying poolside wearing designer clothes"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
                            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                                <h2 className="text-4xl tracking-tight text-white sm:text-4xl">
                                    <span className="block sm:inline">Experience Italian retail prices without leaving your doorstep.</span>
                                </h2>
                                <p className="mt-4 text-white">
                                    Make your desk beautiful and organized. Post a picture to social media and watch it get more likes than
                                    life-changing announcements. Reflect on the shallow nature of existence. At least you have a really nice
                                    desk setup.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}