"use client";

import React, { useState, useEffect } from 'react';
import ServiceArticle from 'components/ServiceArticle';

export default function Glossary({ terms = [] } ) {
  const [currentLetter, setCurrentLetter] = useState([]);
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const filteredTerms = terms.filter(i => i.term.toLowerCase().startsWith(currentLetter));

  return (
    <div className="o-wrapper-medium">
      <div className="c-glossary__alphabet-nav">
        {alphabet.map((letter, index) => (
          <button
            className={`c-glossary__letter ${
              currentLetter === letter ? 'active u-detail--blue' : ''
            }`}
            onClick={() => setCurrentLetter(letter)}
            key={index}
          >
            {letter}
          </button>
        ))}
      </div>

      {filteredTerms.map(
        ({ term = '', definition = [], slug = {} }, index) =>
          definition.length > 0 && (
            <div
              className="c-glossary__terms"
              key={index}
              id={slug.current ? slug.current : ''}
            >
              <h4 className="c-glossary__terms-term">{term}</h4>
              <div className="c-glossary__terms-definition">
                {definition ? <ServiceArticle blocks={definition} /> : null}
              </div>
            </div>
          )
      )}
    </div>
  );
};