/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();

const axios = require('axios');
const sanityClient = require('@sanity/client');
/*
const THUMBNAIL_GENERATOR_SANITY_TOKEN = process.env.THUMBNAIL_GENERATOR_SANITY_TOKEN;
*/
const THUMBNAIL_GENERATOR_SANITY_TOKEN="skLCM2nnKqLZI7RCzKlJ1CMmvZKZYDZaINpITVMKFCNcGMHmXfBeGiGGGDf2EBWerLytPuWThSrjxer1qiyF9aZ31Gl0V7v4qi2siOWdmKPSc7EhQyYNdfIKKwZXYngVO7AalIQCFmjcaEJD2CTMIrrwT7WAT2zCZGHeYxqX6ittIPrbkSnO";

const getSanityClient = () =>
  sanityClient({
    projectId: '1f1lcoov',
    dataset: 'production',
    token: THUMBNAIL_GENERATOR_SANITY_TOKEN,
  });


async function main() {

    const client = getSanityClient();

    // get publications without pdf thumbnail and with a pdf
    const docs = await client.fetch('*[(_type == "publication") && !(_id in path("drafts.**")) && ( pdfThumbnail._type != "image" ) && ((pdfFile._type == "file") || (legacypdf._type == "file"))]{_id, slug, title, pdfFile}|order(date.utc asc)[1..100]');

    /* eslint-disable no-restricted-syntax, no-await-in-loop */
    for (const doc of docs) {
        const { _id, slug, title } = doc;
        const imgUrl = `https://adm.cmi.no/pdf2png/?slug=${slug.current}`;

        console.log('Creating thumbnail ', imgUrl);

        const imgFilename = `${slug.current}.png`;
        const image = await axios.get( imgUrl, { responseType: 'arraybuffer' });
        const data = Buffer.from( image.data, 'binary' );
        if (1==1) {
        client.assets
            .upload( 'image', data )
            .then( imgAsset => { 
                return client
                .patch( _id )
                .set({
                    pdfThumbnail: {
                        _type: 'image',
                        asset: {
                            _type: "reference",
                            _ref: imgAsset._id
                        }
                    }
                })
                .commit()
            })
        }
    }
    console.log('Done');
}

main();