import React from 'react';
import { withRouter } from 'next/router';

const SearchFieldRedirector = ({ router }) => {
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

export default withRouter(SearchFieldRedirector);
