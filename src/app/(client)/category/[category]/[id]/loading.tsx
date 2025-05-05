import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

function ThumbnailListSkeleton() {
  return (
    <div className="flex gap-2 lg:flex-col lg:gap-4">
      {[...Array.from({ length: 3 })].map((_, i) => (
        <Skeleton key={i} className="m-1 h-20 w-20 rounded-md border lg:h-24 lg:w-24" />
      ))}
    </div>
  );
}

function SkeletonImagesCarousel() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Vertical thumbnails for lg/xl+ */}
      <div className="xs:hidden lg:block">{<ThumbnailListSkeleton />}</div>
      <Skeleton className="aspect-square h-auto rounded-xl bg-neutral-100 xs:w-full md:h-[576px] md:w-[576px]" />
      {/* Horizontal thumbnails for sm/md */}
      <div className="mx-auto flex lg:hidden">{<ThumbnailListSkeleton />}</div>
    </div>
  );
}

function SkeletonProductInfo() {
  return (
    <Card className="border-none shadow-transparent sm:w-full lg:m-6 lg:mx-auto xl:w-[600px] xl:p-8">
      <Skeleton className="m-6 h-10 w-4/5" />
      <CardContent className="my-4">
        <div className="mx-6 mt-8 space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-5 w-2/4" />
          <Skeleton className="h-5 w-2/4" />
        </div>
        <div className="mx-6 mt-8 flex flex-col gap-4">
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-full px-2 md:w-auto">
        <div className="py-8">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <CardContent className="flex w-full flex-col shadow-md lg:p-6 xl:flex-row">
          <SkeletonImagesCarousel />
          <SkeletonProductInfo />
        </CardContent>
      </div>
    </div>
  );
}
