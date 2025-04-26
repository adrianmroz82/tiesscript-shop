import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Skeleton } from "@/components/shadcn-ui/skeleton";

function SkeletonImagesCarousel() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-[126px] w-[126px]" />
        ))}
      </div>
      <Skeleton className="w-[570px] h-[560px] rounded-xl" />
    </div>
  );
}

function SkeletonProductInfo() {
  return (
    <Card className="shadow-xl m-6 p-8 w-[600px] border-none">
      <Skeleton className="m-6 h-10 w-3/5" />
      <CardContent className="my-4">
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
          <Skeleton className="h-16 w-3/5 rounded-[30px]" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="flex justify-center h-[600px]">
      <div className="pt-8">
        <div className="py-8">
          <div className="flex space-x-2 mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <CardContent className="shadow-lg flex">
            <SkeletonImagesCarousel />
            <SkeletonProductInfo />
          </CardContent>
        </div>
      </div>
    </div>
  );
}
