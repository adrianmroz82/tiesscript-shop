import { Skeleton } from "@/components/shadcn-ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="w-1/4 p-4 flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center p-2">
        <Skeleton className="h-[600px] w-[400px] rounded-xl" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-wrap">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
