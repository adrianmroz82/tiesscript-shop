"use client";

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
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

    const supabase = createClient();

    try {
      setIsUploading(true);

      const uploadedUrls = (await Promise.all(imagesToUpload.map(uploadImageToSupabase))) as string[];

      const updatedFormData = {
        ...formData,
        main_image: uploadedUrls.length > 0 ? uploadedUrls[0] : "",
      };

      // TODO: error handling
      const { data, error } = await supabase.from("products").insert([updatedFormData]).select("id").single();

      if (error) throw error;
      console.log("Product added:", data);

      // Save the images to resources table
      if (uploadedUrls.length > 0) {
        await supabase.from("resources").insert([{ images: uploadedUrls }]);
      }

      // TODO - is this needed?
      setFormData(updatedFormData);

      toast({
        title: "Success",
        description: `Product added successfully!`,
      });
    } catch (error: any) {
      console.error("Error adding product:", error.message);
      toast({
        title: "Error",
        description: `Failed to add product: ${error.message}`,
        variant: "destructive",
      });
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
              <AddProductImageUploader setImagesToUpload={setImagesToUpload} />
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
