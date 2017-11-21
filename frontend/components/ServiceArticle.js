import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';

const ServiceArticle = ({ blocks }) => <BlockContent blocks={blocks} serializers={serializers} />;

export default ServiceArticle;
