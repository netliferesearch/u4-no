"use client";

import { Scrollchor } from 'react-scrollchor';

export const ScrollToAnchor = ({ to, children }) => {
  return (
    <Scrollchor to={to} disableHistory>
      {children}
    </Scrollchor>
  );
}