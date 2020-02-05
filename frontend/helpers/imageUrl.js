import imageUrlBuilder from '@sanity/image-url';

import client from './client';

const builder = imageUrlBuilder(client);

export default source => builder.image(source);
