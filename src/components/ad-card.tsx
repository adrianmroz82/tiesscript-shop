import Image from 'next/image';

import { PrefetchLink } from '@/components/prefetch-link';
import Ties1 from '@/images/ties1.png';

export function AdCard() {
  return (
    <section className="rounded bg-neutral-50/50 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
        <div className="max-w-md space-y-4">
          <h2 className="text-balance text-3xl font-medium tracking-tight md:text-4xl">
            Discover our latest delivery of ties
          </h2>
          <p className="text-pretty text-neutral-600">Explore our carefully selected products for your lifestyle.</p>
          <PrefetchLink
            className="focus:outline-hidden inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:ring-1 focus:ring-neutral-950"
            href="/category/ties"
          >
            Shop now
          </PrefetchLink>
        </div>
        <Image
          alt=""
          loading="eager"
          priority={true}
          height={350}
          width={350}
          src={Ties1}
          objectFit="cover"
          sizes="350px"
        />
      </div>
    </section>
  );
}
