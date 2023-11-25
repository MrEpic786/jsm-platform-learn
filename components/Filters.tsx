'use client';
import { formUrlQuery } from '@/sanity/utils';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
const links = ['all', 'dental', 'teeth', 'tongue'];

const Filters = () => {
  const [active, setActive] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handelFilter = (link: string) => {
    let newUrl = '';

    if (active === link) {
      setActive('');
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
        value: null,
      });
    } else {
      setActive(link);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: link.toLowerCase(),
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <ul className="text-white-800 body-text no-scrollbar flex w-full max-w-full ga-2 overflow-auto py-12 sm:max-w-2xl">
      {links.map((link) => (
        <button
          key={link}
          className={`whitespace-nowrap rounded-lg px-8 py-2.5 capitalize ${
            active === link ? 'gradient_blue-purple' : ''
          }`}
          onClick={() => {
            handelFilter(link);
          }}
        >
          {link}
        </button>
      ))}
    </ul>
  );
};

export default Filters;
