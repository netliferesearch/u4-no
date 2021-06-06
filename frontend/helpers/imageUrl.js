import imageUrlBuilder from '@sanity/image-url';
import { defaultConfig } from './sanityClient.pico';

const builder = imageUrlBuilder(defaultConfig);

const ImageUrl = source => builder.image(source);

export default ImageUrl;
