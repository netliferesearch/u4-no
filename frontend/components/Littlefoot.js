import dynamic from 'next/dynamic';

export const Littlefoot = dynamic(() => import('./Littlefoot.imported'), { ssr: false });
