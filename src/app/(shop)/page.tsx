import { redirect } from 'next/navigation';

import { ProductGrid, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  console.log({ currentPage, totalPages });

  if (products.length === 0) {
    redirect('/');
  }

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
