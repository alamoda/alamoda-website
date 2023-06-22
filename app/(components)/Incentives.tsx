import Image from 'next/image';

const incentives = [
    {
      name: 'Free shipping',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
      description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      name: '10-year warranty',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
      description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      name: 'Exchanges',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
      description:
        "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
  ]

export default function Incentives() {
    return (
        <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
            <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl tracking-tight text-gray-900">
                  We built our business on great customer service
                </h2>
                <p className="mt-4 text-gray-800">
                  At the beginning at least, but then we realized we could make a lot more money if we kinda stopped
                  caring about that. Our new strategy is to write a bunch of things that look really good in the
                  headlines, then clarify in the small print but hope people don&apos;t actually read it.
                </p>
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden bg-gray-100">
                <Image
                  src="/brand-alamoda.jpg"
                  alt="Women clothes on a hanger"
                  className="object-cover object-center"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div key={incentive.name} className="sm:flex lg:block">
                  <div className="sm:flex-shrink-0">
                    <Image 
                    className="h-10 w-10" 
                    src={incentive.imageSrc} 
                    alt="" 
                    width={1000}
                    height={1000}
                    />
                  </div>
                  <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                    <p className="mt-2 text-sm text-gray-800">{incentive.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}
