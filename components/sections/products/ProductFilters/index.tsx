'use client';

import { FC, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';

import { Supermarket, Tag } from '@/lib';

import { SupermarketSelect, TagSelect } from '../../../ui';

type Props = {
  tags: Tag[];
  tagsError?: string | undefined;
  supermarkets: Supermarket[];
  supermarketsError?: string | undefined;
  selectedTagId?: string | undefined;
  selectedSupermarketId?: string | undefined;
};

export const ProductFilters: FC<Props> = ({
  tags,
  tagsError,
  supermarkets,
  supermarketsError,
  selectedTagId = '',
  selectedSupermarketId = '',
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tag, setTag] = useState(selectedTagId);
  const [supermarket, setSupermarket] = useState(selectedSupermarketId);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleTagChange = (tags: string[]) => {
    setTag(tags[0] ?? '');
    updateParam('tagId', tags[0] ?? '');
  };

  const handleSupermarketChange = (supermarket: string) => {
    setSupermarket(supermarket);
    updateParam('supermarketId', supermarket);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TagSelect
        tags={tags}
        disabled={!tags.length}
        selectedTags={[tag]}
        setTags={handleTagChange}
        error={tagsError}
      />

      <SupermarketSelect
        supermarkets={supermarkets}
        selectedSupermarket={supermarket}
        setSupermarket={handleSupermarketChange}
        disabled={!supermarkets.length}
        error={supermarketsError}
      />
    </Box>
  );
};
