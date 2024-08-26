import { ProductImagesCarousel } from "@/components/product-images-carousel";
import { CardContent } from "@/components/shadcn-ui/card";
import { ProductDetailsInfo } from "@/components/product-details-info";
import { getProduct } from "@/lib/api/getProduct";
import { getProductImages } from "@/lib/api/getProductImages";
import { Category } from "@/models/product.model";

interface Props {
  params: { category: Category; id: string };
}

export default async function DetailsPage({ params }: Props) {
  const { category, id } = params;
  const product = await getProduct(id, category);
  const productImages = await getProductImages(id);

  return (
    <CardContent className="shadow-lg">
      <div className="flex" style={{ border: "1px solid red" }}>
        <ProductImagesCarousel productImages={productImages!} />
        <ProductDetailsInfo product={product!} />
      </div>
    </CardContent>
  );
}
