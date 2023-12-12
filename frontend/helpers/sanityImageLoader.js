"use client";

export default function loader({ src, width, quality }) {
  return `${src}?auto=format&w=${width}&q=${quality || 75}&fit=max`;
};

