import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import Download from 'components/icons/Download';
import PdfEmbed from 'components/pdfEmbed/PdfEmbed';
import { groq } from 'next-sanity';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

export default async function Asset({ params }){
  
  const data = await getData(params);
  const { 
    title = '', 
    slug = '', 
    url = '', 
  } = data;

  const isPdf = url.slice(-4) === '.pdf';
  const isDoc = url.slice(-4) === '.doc' || url.slice(-5) === '.docx';
  
  return (
    <Layout>
      <header>
        <div className="u-tc u-margin-bottom">
          <h2 className="c-page-intro__h u-primary-heading">{title}</h2>
          <a href={url} {...classes('download-text')}>
            <span>Download {isPdf ? 'PDF' : 'file'}</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      </header>

      {isPdf && 
        <PdfEmbed src={url} title={title} mode="inline" />
      }

      {isDoc && (
        <div className="o-wrapper u-tc">
          <iframe
            className="c-pdf-viewer"
            title={title}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
            width="100%"
            height="800"
            frameBorder="0"
            style={{ maxWidth: 1000, maxHeight: '75vh' }}
          >
            Your browser does not allow embedding of word documents, please use the download link
            above
          </iframe>
        </div>
      )}

    </Layout>
  );
};
export async function generateMetadata({ params }) {

  const data = await getData(params);
  const {
    title = '',
    lead = '',
    featuredImage = '',
  } = data;

  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url
  });
}

const sanityQuery = groq`*[_type=="asset" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "url": asset.asset->url
}`;

async function getData(params) {
  const data = await fetchAndMaterialize({ 
    query: sanityQuery, 
    params,
    tags: [`asset:${params.slug}`],
    materializeDepth: 0
  });
  return data;
}