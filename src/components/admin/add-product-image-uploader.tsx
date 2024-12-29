import imageCompression from "browser-image-compression";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";

interface Props {
  setImagesUpload: (_files: File[]) => void;
}

// TODO: extract image compression logic to a custom hook

export function AddProductImageUploader({ setImagesUpload }: Props) {
  const [imagesPreview, setImagesPreview] = useState<{ file: File; previewUrl: string }[]>([]);

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
      }));

      setImagesPreview((prev) => [...prev, ...newPreviews]);
      setImagesUpload(resizedFiles);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image">Image</Label>
      <Input id="image" type="file" name="image" multiple onChange={handleAddImage} />
      <div className="flex space-x-4 flex-wrap">
        {imagesPreview.map((image, index) => (
          <div key={index} className="relative">
            <Image width={128} height={128} src={image.previewUrl} alt="product" className="object-cover h-32" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
