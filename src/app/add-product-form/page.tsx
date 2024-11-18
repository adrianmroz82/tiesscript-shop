"use client";

import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";

import { AddProductCategorySelect } from "@/components/admin/add-product-category-select";
import { AddProductImageUploader } from "@/components/admin/add-product-image-uploader";
import { AddProductTextInput } from "@/components/admin/add-product-text-input";
import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import { useToast } from "@/components/shadcn-ui/use-toast";
import { db } from "@/firebase/firebase";
import { getAllCategories } from "@/lib/api/getAllCategories";
import { Category, ProductWithImages } from "@/models/product.model";

export default function AddProductForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductWithImages>({
    id: "",
    name: "",
    price: 0,
    length: 0,
    width: 0,
    images: [],
    createdAt: new Date().toISOString(),
  });
  const [category, setCategory] = useState<Category>("" as Category);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagesUpload, setImagesUpload] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    }

    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value: Category) => {
    setCategory(value);
    setFormData((prevData) => ({ ...prevData, category: value }));
  };

  async function uploadImages(productId: string) {
    if (!imagesUpload || imagesUpload.length === 0) return [];

    const storage = getStorage();
    const imageUrls = await Promise.all(
      imagesUpload.map(async (file) => {
        const storageRef = ref(storage, `products/${productId}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );

    return imageUrls;
  }

  async function handleAddDoc(e: any) {
    e.preventDefault();

    try {
      setIsUploading(true);

      const docRef = await addDoc(collection(db, category), {
        ...formData,
        price: Number(formData.price),
        length: Number(formData.length),
        width: Number(formData.width),
        images: [],
        createdAt: new Date().toISOString(),
      });

      const productId = docRef.id;

      const imageUrls = await uploadImages(productId);

      await addDoc(collection(db, category), {
        ...formData,
        images: imageUrls,
      });

      toast({
        title: "Success",
        description: `Document written with ID: ${productId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error adding document: ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-[64rem] pt-8 px-2">
        <CardContent>
          <form className="flex flex-col items-center">
            <div className="grid w-full items-center gap-4">
              <AddProductTextInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
              <AddProductCategorySelect categories={categories} value={category} onChange={handleSelectChange} />
              <AddProductTextInput label="Length" name="length" value={formData.length} onChange={handleInputChange} />
              <AddProductTextInput label="Width" name="width" value={formData.width} onChange={handleInputChange} />
              <AddProductTextInput label="Price" name="price" value={formData.price} onChange={handleInputChange} />
              <AddProductImageUploader setImagesUpload={setImagesUpload} />
              <CardFooter className="flex gap-4 px-0 py-4">
                <Button className="w-full" onClick={handleAddDoc}>
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
