import Image from "next/image";
import { ChangeEvent, memo, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { v4 } from "uuid";

import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { createClient } from "@/utils/supabase/client";

interface Props {
  setResourceImages: (_files: File[]) => void;
}

export async function uploadImageToSupabase(file: File): Promise<string | null> {
  const supabase = createClient();
  const filePath = `products/${v4()}-${file.name}`;

  // Upload image to Supabase Storage
  const { error } = await supabase.storage.from("images").upload(filePath, file);
  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  // Retrieve the public URL
  // TODO: is this needed?
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  return data?.publicUrl || null;
}

export const AddProductImageUploader = memo(function AddProductImageUploader({ setResourceImages }: Props) {
  const [imagesPreview, setImagesPreview] = useState<{ file: File; previewUrl: string; id: string }[]>([]);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}`,
      }));
      setImagesPreview((prev) => [...prev, ...newPreviews]);
      // @ts-ignore
      setResourceImages((prev: File[]) => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (id: string) => {
    // Remove image by Id, map to file objects, and update the state
    const updatedImages = imagesPreview.filter((image) => image.id !== id);
    setImagesPreview(updatedImages);

    const updatedFiles = updatedImages.map((image) => image.file);
    setResourceImages(updatedFiles);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const reorderedImages = [...imagesPreview];
    const [removed] = reorderedImages.splice(oldIndex, 1);

    // Re-insert the removed item at the new index, get the reordered images and update the state
    reorderedImages.splice(newIndex, 0, removed);
    setImagesPreview(reorderedImages);

    const reorderedFiles = reorderedImages.map((image) => image.file);
    setResourceImages(reorderedFiles);
  };

  const SortableItem = SortableElement(
    ({ image, index }: { image: { previewUrl: string; id: string }; index: number }) => (
      <div key={index} className="relative">
        <Image width={128} height={128} src={image.previewUrl} alt="product" className="object-cover h-32" />
        <button
          type="button"
          onClick={() => handleRemoveImage(image.id)} // Remove by unique ID
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full">
          ✕
        </button>
      </div>
    )
  );

  const SortableList = SortableContainer(({ images }: { images: { previewUrl: string; id: string }[] }) => {
    return (
      <div className="flex space-x-4 flex-wrap">
        {images.map((image, index) => (
          // TODO: fix this type error
          // @ts-ignore
          <SortableItem key={image.id} index={index} image={image} />
        ))}
      </div>
    );
  });

  return (
    <div className="space-y-4">
      <Label htmlFor="image">Image</Label>
      <Input id="image" type="file" name="image" multiple onChange={handleAddImage} />
      {/* TODO: fix this type error */}
      {/*  @ts-ignore */}
      <SortableList images={imagesPreview} onSortEnd={onSortEnd} axis="xy" />
    </div>
  );
});
