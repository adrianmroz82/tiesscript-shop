import Image from "next/image";

import { PrefetchLink } from "@/components/prefetch-link";
import Ties1 from "@/images/ties1.jpg";

export function AdCard() {
  return (
    <section className="rounded  bg-neutral-50/50 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
        <div className="max-w-md space-y-4">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Discover our latest delivery of ties
          </h2>
          <p className="text-pretty text-neutral-600">Explore our carefully selected products for your lifestyle.</p>
          <PrefetchLink
            className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
            href="/ties">
            Shop now
          </PrefetchLink>
        </div>
        <Image
          alt=""
          loading="eager"
          priority={true}
          height={300}
          width={450}
          src={Ties1}
          objectFit="cover"
          sizes="(max-width: 640px) 70vw, 450px"
        />
      </div>
    </section>
  );
}
