import Script from 'next/script';

export default function BrandLogos() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Shop for the
          </h2> */}
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/brands/dior.png"
            alt="Dior"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/brands/gucci.png"
            alt="Gucci"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/brands/prada.png"
            alt="Prada"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="/brands/loro-piana.png"
            alt="Loro Piana"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="/brands/dolce-gabbana.jpg"
            alt="Dolce & Gabbana"
            width={158}
            height={48}
          />
        </div>

        <Script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" />

        <div className="mt-10 trustpilot-widget" data-locale="en-US" data-template-id="5419b6a8b0d04a076446a9ad" data-businessunit-id="6477b767a164d7a66fa3f704" data-style-height="24px" data-style-width="100%" data-theme="light" data-min-review-count="10" data-without-reviews-preferred-string-id="1" data-style-alignment="center">
          <a href="https://www.trustpilot.com/review/alamodainc.com" target="_blank" rel="noopener">Trustpilot</a>
        </div>

      </div>
    </div>
  )
}