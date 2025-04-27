import { EmptyState } from "@/components/empty-state";
import { ProductDetailsBreadcrumbs } from "@/components/product-details-breadcrumbs";
import { ProductDetailsInfo } from "@/components/product-details-info";
import { ProductImagesCarousel } from "@/components/product-images-carousel";
import { CardContent } from "@/components/shadcn-ui/card";
import { SimilarProducts } from "@/components/similar-products";
import { getProduct } from "@/lib/api/getProduct";
import { getProductImages } from "@/lib/api/getProductImages";
import { getSimilarProducts } from "@/lib/api/getSimilarProducts";
interface Props {
  params: { id: string; category: string };
}

export default async function DetailsPage({ params }: Props) {
  const { category, id } = params;
  const product = await getProduct(id);
  const productImages = await getProductImages(id);
  const similarProducts = await getSimilarProducts(category);

  if (!product) {
    return <EmptyState text="Product not found" />;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="pt-8">
          <div className="py-8">
            <ProductDetailsBreadcrumbs product={product} />
          </div>
          <CardContent className="shadow-lg flex">
            {productImages && <ProductImagesCarousel productImages={productImages} />}
            <ProductDetailsInfo product={product} />
          </CardContent>
        </div>
      </div>
      <SimilarProducts products={similarProducts} />
    </>
  );
}
