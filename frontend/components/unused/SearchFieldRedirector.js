import React from 'react';
import { useRouter } from 'next/router';

export const SearchFieldRedirector = () => {
  const router = useRouter();
  return (
    <form>
      <input
        onChange={e => {
          const { value = '' } = e.target;
          if (value.length > 2) {
            router.push(`/search?search=${value}`);
          }
        }}
        type="text"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
