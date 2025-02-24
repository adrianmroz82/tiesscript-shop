import imageCompression from "browser-image-compression";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";

interface Props {
  setImagesUpload: (_files: File[]) => void;
}

export function AddProductImageUploader({ setImagesUpload }: Props) {
  const [imagesPreview, setImagesPreview] = useState<{ file: File; previewUrl: string; id: string }[]>([]);

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const resizedFiles = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 2,
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
        id: `${file.name}-${Date.now()}`,
      }));

      setImagesPreview((prev) => [...prev, ...newPreviews]);
      setImagesUpload(resizedFiles);
    }
  };

  const handleRemoveImage = (id: string) => {
    // Remove image by Id, map to file objects, and update the state
    const updatedImages = imagesPreview.filter((image) => image.id !== id);
    setImagesPreview(updatedImages);

    const updatedFiles = updatedImages.map((image) => image.file);
    setImagesUpload(updatedFiles);
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const reorderedImages = [...imagesPreview];
    const [removed] = reorderedImages.splice(oldIndex, 1);

    // Re-insert the removed item at the new index, get the reordered images and update the state
    reorderedImages.splice(newIndex, 0, removed);
    setImagesPreview(reorderedImages);

    const reorderedFiles = reorderedImages.map((image) => image.file);
    setImagesUpload(reorderedFiles);
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
          <SortableItem key={image.id} index={index} image={image} />
        ))}
      </div>
    );
  });

  return (
    <div className="space-y-4">
      <Label htmlFor="image">Image</Label>
      <Input id="image" type="file" name="image" multiple onChange={handleAddImage} />
      <SortableList images={imagesPreview} onSortEnd={onSortEnd} axis="xy" />
    </div>
  );
}
