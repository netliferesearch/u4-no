import React, { useState, useEffect } from 'react';
import { fetchAndMaterialize } from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import ServiceArticle from '../../components/ServiceArticle';
import { PageIntro } from '../../components/general/PageIntro';
const Glossary = ({ data: { terms = [] }, url = {} }) => {
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
    <Layout
      className="o-wrapper"
      headComponentConfig={{
        title: 'Glossary',
        description: '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="c-glossary">
        <section className="o-wrapper-medium">
          <PageIntro
            className="c-page-intro--about-u4"
            title="Glossary"
            type="about-u4"
            text="This glossary presents how our anti-corruption experts explain and apply typical governance and corruption jargon."
          />
        </section>
        <hr className="u-section-underline--no-margins" />

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
      </div>
      <Footer />
    </Layout>
  );
};

export default Glossary;

const queryFunc = () => ({
  sanityQuery: `{
    "terms": *[_type == "term"] | order(term)
  }`,
});

export const getStaticProps = async ctx => {
  const { data, error = '' } = await fetchAndMaterialize({
    nextContext: ctx,
    queryFunc,
    materializeDepth: 1,
  });
  if (error === 'No content found (dataLoader said this)') {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate: 60,
  };
};
