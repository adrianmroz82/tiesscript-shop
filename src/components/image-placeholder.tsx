import Image from 'next/image';

export function ImagePlaceholder() {
  const IMG_SRC = '/no-image-placeholder.svg';

  return (
    <Image
      className="justify-center object-contain align-middle"
      src={IMG_SRC}
      alt="Image Placeholder"
      width={150}
      height={150}
    />
  );
}
