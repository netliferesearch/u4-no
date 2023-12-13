import React from 'react';
import { AboutAuthor } from 'components/blog/AboutAuthor';
import { Disclaimers } from 'components/general/disclaimers/Disclaimers';
import { Cite } from 'components/publication/Cite';
import { Keywords } from 'components/general/keywords/Keywords';
import TnrcFooter from 'components/general/tnrc/TnrcFooter';
import { ArticleActions } from '../article/ArticleActions';
import { PhotoCredit } from 'components/general/PhotoCredit';

export const PublicationAdditionalInfo = ({ data = {} }) => {
  const { _type = '', authors = [], publicationType = {}, keywords = [], language = 'en', featuredImage = {} } = data;

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
            <ArticleActions data={data} />
            <AboutAuthor authors={authors} language={language} />
            <Disclaimers title={true} />
            {keywords && <Keywords title={true} keywords={keywords} hr={true} />}
            <PhotoCredit image={featuredImage} />
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
