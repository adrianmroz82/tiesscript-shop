import { ProductDetailsInfo } from "@/components/product-details-info";
import { ProductImagesCarousel } from "@/components/product-images-carousel";
import { CardContent } from "@/components/shadcn-ui/card";
import { getProduct } from "@/lib/api/getProduct";
import { getProductImages } from "@/lib/api/getProductImages";

interface Props {
  params: { id: string };
}

export default async function DetailsPage({ params }: Props) {
  const { id } = params;
  const product = await getProduct(id);
  const productImages = await getProductImages(id);

  return (
    <div className="px-16 py-8">
      <CardContent className="shadow-lg">
        <div className="flex">
          <ProductImagesCarousel productImages={productImages!} />
          <ProductDetailsInfo product={product!} />
        </div>
      </CardContent>
    </div>
  );
}
