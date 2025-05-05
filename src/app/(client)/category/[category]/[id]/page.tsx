import { Suspense } from 'react';

import { EmptyState } from '@/components/empty-state';
import { ProductDetailsBreadcrumbs } from '@/components/product-details-breadcrumbs';
import { ProductDetailsInfo } from '@/components/product-details-info';
import { ProductImageModal } from '@/components/product-image-modal';
import { ProductImagesCarousel } from '@/components/product-images-carousel';
import { CardContent } from '@/components/shadcn-ui/card';
import { SimilarProducts } from '@/components/similar-products';
import { getProduct } from '@/lib/api/getProduct';
import { getProductImages } from '@/lib/api/getProductImages';
import { getSimilarProducts } from '@/lib/api/getSimilarProducts';

interface Props {
  params: { id: string; category: Category['name'] };
}

export default async function DetailsPage({ params }: Props) {
  const { category, id } = params;

  const product = await getProduct(id);
  const productImages = await getProductImages(id);
  const similarProducts = await getSimilarProducts(category);

  if (!product) {
    return <EmptyState text="Product not found" />;
  }

  // await fakeDelay(2000);

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-full px-2">
          <div className="py-8">
            <ProductDetailsBreadcrumbs product={product} />
          </div>
          <CardContent className="flex flex-col shadow-md lg:p-6 xl:flex-row">
            {productImages && <ProductImagesCarousel productImages={productImages} />}
            <ProductDetailsInfo product={product} />
          </CardContent>
        </div>
      </div>
      <Suspense>
        <SimilarProducts products={similarProducts} category={category} />
      </Suspense>
      <Suspense>
        <ProductImageModal images={productImages!} />
      </Suspense>
    </>
  );
}
