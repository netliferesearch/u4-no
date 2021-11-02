import React from 'react';
import { AboutAuthor } from '../blog/AboutAuthor';
import { Disclaimers } from '../general/disclaimers/Disclaimers';
import { Cite } from '../publication/Cite';
import { Keywords } from '../general/keywords/Keywords';
import TnrcFooter from '../general/tnrc/TnrcFooter';
import { ArticleActions } from '../general/article-actions/ArticleActions';

export const PublicationAdditionalInfo = ({ data = {}, setReaderOpen = () => null }) => {
  const { _type = '', authors = [], publicationType = {}, keywords = [] } = data;

  return (
    <>
      {_type !== 'blog-post' && (
        <section className="u-bg--blue">
          <div className="o-wrapper-medium">
            <div className="o-wrapper-narrow">
              <Cite {...data} />
            </div>
          </div>
        </section>
      )}
      <section className="u-bg--lighter-blue c-article__additional-content">
        <div className="o-wrapper-medium">
          <div className="o-wrapper-narrow">
            <ArticleActions data={data} setReaderOpen={setReaderOpen} />
            <AboutAuthor authors={authors} />
            <Disclaimers title={true} />
            {keywords.length > 0 ? <Keywords title={true} keywords={keywords} hr={true} /> : null}
          </div>
        </div>
      </section>
      <section className="o-wrapper-medium">
        <div className="o-wrapper-narrow">
          <TnrcFooter publicationTypeId={publicationType._id} />
        </div>
      </section>
    </>
  );
};
