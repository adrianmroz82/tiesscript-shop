'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DrawerClose } from '@/components/shadcn-ui/drawer';
import { capitalize } from '@/lib/utils/capitalize';

import { StoreConfig } from './yns/store.config';

interface Props {
  categories: StoreConfig['categories'];
}

export function CategoryMenuItems({ categories }: Props) {
  const router = useRouter();

  const handleCategoryClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <ul className="flex flex-col">
      {categories.map(({ name, slug }) => (
        <DrawerClose key={name}>
          <li
            onClick={() => handleCategoryClick(slug)}
            className="flex h-12 cursor-pointer items-center rounded-lg hover:bg-muted"
          >
            <Image
              src={`/sidebar-menu-${name.toLocaleLowerCase()}.svg`}
              className="mx-4"
              alt={name}
              width={32}
              height={32}
            />
            <p>{capitalize(name)}</p>
          </li>
        </DrawerClose>
      ))}
    </ul>
  );
}
