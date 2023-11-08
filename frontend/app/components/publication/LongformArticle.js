"use client";

import React, { useEffect } from 'react';

export default function LongformArticle({ children }) {
  useEffect(() => {
    const littlefoot = require('littlefoot').default;
    littlefoot();
  }, []);

  return children;
};
