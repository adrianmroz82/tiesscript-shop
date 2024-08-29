"use client";

import imageCompression from "browser-image-compression";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";
import { useToast } from "@/components/shadcn-ui/use-toast";
import { db } from "@/firebase/firebase";
import { getAllCategories } from "@/lib/api/getAllCategories";
import { Category, ProductWithImages } from "@/models/product.model";

export default function ProductForm() {
  const { toast } = useToast();

  const [imagesUpload, setImageUpload] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
  const [imagesPreview, setImagesPreview] = useState<{ file: File; previewUrl: string }[]>([]);

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

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const resizedFiles = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 2,
            // maxWidthOrHeight: 800,
            useWebWorker: true,
          };
          try {
            const compressedFile = await imageCompression(file, options);

            console.log(`Original ${file.name}: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
            console.log(`Compressed ${compressedFile.name}: ${(compressedFile.size / (1024 * 1024)).toFixed(2)} MB`);

            return compressedFile;
          } catch (error) {
            console.error("Error compressing image:", error);
            return file;
          }
        })
      );

      const newPreviews = resizedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImagesPreview((prev) => [...prev, ...newPreviews]);
      setImageUpload((prev) => (prev ? [...prev, ...resizedFiles] : resizedFiles));
    }
  };

  const handleSelectChange = (value: Category) => {
    setCategory(value);
  };

  const handleRemoveImage = (index: number) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  async function uploadImages(productId: string) {
    if (!imagesUpload || imagesUpload.length === 0) return [];

    const storage = getStorage();
    const imageUrls = await Promise.all(
      Array.from(imagesUpload).map(async (file) => {
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
      setFormData((prevData) => ({ ...prevData, id: productId }));

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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Select value={category} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="length">Length</Label>
                <Input
                  type="text"
                  name="length"
                  placeholder="Length"
                  value={formData.length}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="width">Width</Label>
                <Input
                  type="text"
                  name="width"
                  placeholder="Width"
                  value={formData.width}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1.5 ">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" name="image" multiple onChange={handleAddImage} />
                <div className="flex space-x-1.5 flex-wrap">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="relative">
                      <Image width={128} height={128} src={image.previewUrl} alt="product" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/*  */}
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
