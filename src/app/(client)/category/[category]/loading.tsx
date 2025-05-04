import { Skeleton } from "@/components/shadcn-ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl">
      <Skeleton className="h-10 w-1/4" />
      <div className="pt-8">
        <Skeleton className="h-8 w-1/4" />
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <article className="flex h-full flex-col rounded border bg-white">
              <Skeleton className="h-[415px] w-[300px] bg-neutral-100" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="mt-1 h-5 w-1/2" />
              </div>
              <div className="pt-3">
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
