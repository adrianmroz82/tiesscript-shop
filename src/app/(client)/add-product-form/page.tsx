"use client";

import imageCompression from "browser-image-compression";
import { ChangeEvent, useState } from "react";

import { AddProductCategorySelect } from "@/components/admin/add-product-category-select";
import { AddProductImageUploader, uploadImageToSupabase } from "@/components/admin/add-product-image-uploader";
import { AddProductTextInput } from "@/components/admin/add-product-text-input";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import { useToast } from "@/components/shadcn-ui/use-toast";
// import { Category } from "@/models/product.model";
import { createClient } from "@/utils/supabase/client";

export default function AddProductForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    length: 0,
    width: 0,
    main_image: "",
    created_at: new Date().toISOString(),
  } as Product);
  const [category, setCategory] = useState<Category>("ties" as Category);
  const [categories, setCategories] = useState<Category[]>([]);
  // const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [resourceImages, setResourceImages] = useState<File[]>([]); // Store resource images

  // useEffect(() => {
  //   async function fetchCategories() {
  //     const categoriesData = await getAllCategories();
  //     setCategories(categoriesData);
  //   }

  //   fetchCategories();
  // }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value: Category) => {
    setCategory(value);
    setFormData((prevData) => ({ ...prevData, category: value }));
  };

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const supabase = createClient();

      // Separate main image (first one)
      const mainImageFile = resourceImages[0];

      // ✅ Compress main image for products table (0.2MB)
      const compressedMainImage = await imageCompression(mainImageFile, {
        maxSizeMB: 0.2,
        useWebWorker: true,
      });

      // ✅ Upload main image to Supabase
      const mainImageUrl = await uploadImageToSupabase(compressedMainImage);

      // ✅ Compress all images (including the main one again) to 1MB for resources table
      const compressedResourceImages = await Promise.all(
        resourceImages.map(async (file) => {
          return await imageCompression(file, {
            maxSizeMB: 1,
            useWebWorker: true,
          });
        })
      );

      // ✅ Upload all resource images (including the main one again)
      const uploadedResourceUrls = await Promise.all(compressedResourceImages.map(uploadImageToSupabase));

      // ✅ Save product to products table with compressed main image
      const updatedFormData = {
        ...formData,
        main_image: mainImageUrl || "",
      };

      const { data: product, error } = await supabase.from("products").insert([updatedFormData]).select("id").single();
      if (error) throw error;

      // ✅ Save resources to resources table (including main image again at 1MB)
      if (uploadedResourceUrls.length > 0) {
        await supabase.from("resources").insert([{ id: product.id, images: uploadedResourceUrls }]);
      }

      setFormData(updatedFormData);
      toast({ title: "Success", description: "Product added successfully!" });
    } catch (error: any) {
      console.error("Error adding product:", error.message);
      toast({ title: "Error", description: `Failed to add product: ${error.message}`, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-[64rem] pt-8 px-2">
        <CardContent>
          <form className="flex flex-col items-center">
            <div className="grid w-full items-center gap-4">
              <AddProductTextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
              <AddProductCategorySelect categories={categories} value={category} onChange={handleSelectChange} />
              <AddProductTextInput label="Length" name="length" value={formData.length!} onChange={handleInputChange} />
              <AddProductTextInput label="Width" name="width" value={formData.width!} onChange={handleInputChange} />
              <AddProductTextInput label="Price" name="price" value={formData.price} onChange={handleInputChange} />
              <AddProductImageUploader
                // setImagesToUpload={setImagesToUpload}
                setMainImage={setMainImage}
                setResourceImages={setResourceImages}
              />
              <CardFooter className="flex gap-4 px-0 py-4">
                <Button className="w-full" onClick={handleAddProduct}>
                  Add item
                </Button>
                <Button className="w-full" size="lg" variant="secondary">
                  Save as draft
                </Button>
                {isUploading && <p>Data is uploading...</p>}
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
