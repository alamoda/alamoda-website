import Products from '@/app/components/Products';

const diocane = false;

export default function Home() {
  return (
    <div>
      <div>
        Hello diocane
      </div>
      {diocane ? <Products /> : null}
    </div>
  )
}
