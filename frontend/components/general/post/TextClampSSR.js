"use client";

import React from 'react';
import { useEffect, useState } from 'react';
//import dynamic from 'next/dynamic';

import TextClamp from 'react-string-clamp';
//const TextClamp = dynamic(() =>
//  import('react-string-clamp')
//);

const TextClampStatic = ({ text = '', lines = 1 }) => {
  const maxChar = 50 * lines;
  const str = text.toString();
  return (str.length <= maxChar) 
    ? (<div style={{display: 'block', width: '100%'}}>{str}</div>)
    : (<div style={{display: 'block', width: '100%'}}>{str.substring(0, str.lastIndexOf(' ', maxChar)).concat(String.fromCharCode(8230))}</div>);
}

export const TextClampSSR = ({ text = '', lines = 1 }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if ( typeof window !== 'undefined' ) {
      setIsClient(true);
    }
  }, []);

  //console.log(text,lines,typeof window);
  //return <TextClampStatic text={text} lines={lines} />;
  return ( isClient ) 
    ? <TextClamp text={text} lines={lines} />
    : <TextClampStatic text={text} lines={lines} />;
}