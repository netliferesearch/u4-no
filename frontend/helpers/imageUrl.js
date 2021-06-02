import imageUrlBuilder from '@sanity/image-url';

import client from './client';

const builder = imageUrlBuilder(client);

const ImageUrl = source => builder.image(source);

export default ImageUrl