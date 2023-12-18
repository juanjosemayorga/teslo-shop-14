import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { SizeSelector } from "@/components";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { ProductSlideShow } from '../../../../components/product/slide-show/ProductSlideShow';
import { ProductMobileSlideshow } from '../../../../components/product/slide-show/ProductMobileSlideshow';

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">


      <div className="col-span-1 md:col-span-2">
        {/* MobileSlideShow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop SlideShow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>

        {/* Size Selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Amount Selector */}
        <QuantitySelector
          quantity={2}
          // maxQuantity={product.quantity}
        />

        {/* Button */}
        <button className="btn-primary my-5">
          Add to Cart
        </button>

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">
          {product.description}
        </p>
      </div>

    </div>
  );
}