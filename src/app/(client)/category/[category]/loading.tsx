import { Skeleton } from "@/components/shadcn-ui/skeleton";

export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto">
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <article className="h-full flex flex-col rounded border bg-white">
              <Skeleton className="w-[300px] h-[415px] bg-neutral-100" />
              <div className="p-4 space-y-2">
                <Skeleton className=" h-7 w-3/4" />
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
