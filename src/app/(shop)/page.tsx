export const revalidate = 60; // 1 minute
import { redirect } from 'next/navigation';

import { ProductGrid, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination } from '../../components/ui/pagination/Pagination';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

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

      <Pagination totalPages={totalPages} />
    </>
  )
}
