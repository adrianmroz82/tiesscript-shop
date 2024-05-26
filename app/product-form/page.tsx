"use client";

import { ChangeEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";

import { Input } from "@/components/shadcn-ui/input";
import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import { Label } from "@/components/shadcn-ui/label";
import { Button } from "@/components/shadcn-ui/button";
import { useToast } from "@/components/shadcn-ui/use-toast";
import { Category, Product } from "../models/product.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn-ui/select";

export default function ProductForm() {
  const { toast } = useToast();

  const [imagesUpload, setImageUpload] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    length: 0,
    width: 0,
    images: [],
    category: "" as Category,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpload(e.target.files);
      const imageUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, images: imageUrls }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, category: value as Category })); // TODO adjust type
  };

  async function uploadImages(productId: string) {
    if (imagesUpload) {
      const storage = getStorage();

      const imageUrls = await Promise.all(
        Array.from(imagesUpload).map(async (file) => {
          const storageRef = ref(storage, `products/${productId}/${file.name}`);
          console.log("gowno", productId);
          await uploadBytes(storageRef, file, { customMetadata: { order: "0" } });
          return getDownloadURL(storageRef);
        })
      );

      setFormData((prevData) => ({ ...prevData, images: [...prevData.images, ...imageUrls] }));
    }
  }

  async function handleAddDoc(e: any) {
    // TODO adjust type

    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, "items"), formData);
      await uploadImages(docRef.id);
      toast({
        title: "Success",
        description: `Document written with ID: ${docRef.id}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Error adding document: ${error}`,
        variant: "destructive",
      });
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
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ties">Ties</SelectItem>
                    <SelectItem value="blazers">Blazers</SelectItem>
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
                <Input id="image" type="file" name="image" multiple onChange={handleImageChange} />
                {formData.images.length > 0 &&
                  formData.images?.map((image) => (
                    <Image width={128} height={500} key={image} src={image} alt="product" />
                  ))}
              </div>
              <CardFooter className="flex gap-4 px-0 py-4">
                <Button className="w-full" onClick={handleAddDoc}>
                  Add item
                </Button>
                <Button className="w-full" size="lg" variant="secondary">
                  Save as draft
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
