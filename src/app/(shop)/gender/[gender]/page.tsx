import { notFound, redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from '../../../../components/ui/pagination/Pagination';
import { ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ gender: gender as Gender, page });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'For everyone',
  }

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={labels[gender]}
        subTitle="All the products"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}