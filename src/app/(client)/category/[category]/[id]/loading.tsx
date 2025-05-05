import { Card, CardContent } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';

function SkeletonImagesCarousel() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-[126px] w-[126px]" />
        ))}
      </div>
      <Skeleton className="h-[560px] w-[570px] rounded-xl" />
    </div>
  );
}

function SkeletonProductInfo() {
  return (
    <Card className="m-6 w-[600px] border-none p-8 shadow-xl">
      <Skeleton className="m-6 h-10 w-3/5" />
      <CardContent className="my-4">
        <div className="mt-8 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="flex h-[600px] justify-center">
      <div className="pt-8">
        <div className="py-8">
          <div className="mb-8 flex space-x-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <CardContent className="flex shadow-lg">
            <SkeletonImagesCarousel />
            <SkeletonProductInfo />
          </CardContent>
        </div>
      </div>
    </div>
  );
}
