import { getPaginatedProductsWithImages } from '@/actions';
import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products;

export default async function Home() {
  const productsTemp = await getPaginatedProductsWithImages();

  return (
    <>
      <Title
        title='Shop'
        subTitle='All the products'
        className='mb-2'
      />

      <ProductGrid products={products} />
    </>
  )
}
