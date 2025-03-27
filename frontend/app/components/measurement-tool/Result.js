import { Post, POST_TYPE } from '@/components/general/post/Post';
import { getPlaceholder } from '@/helpers/imgloader';
import Image from 'next/image';
import sanityImageLoader from '@/helpers/sanityImageLoader';
import { getPostType } from '../../../helpers/getRouteByType';
import TextClampSSR from '@/components/general/post/TextClampSSR';
import { Topics } from '@/components/general/topics/Topics';
import dateToString from '@/helpers/dateToString';
import { CalendorIcon } from '@/components/icons/CalendorIcon';
import LinkToItem from '@/components/general/LinkToItem';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';

export const Result = props => {
  const tool = {
    ...props.tool,
    topics: props.tool?.topic,
  };

  return (
    <div className="c-tools-result">
      <div className="c-post tool">
        <div className="c-post__post-info">
          <h4 className="c-post__title">{tool.title}</h4>
          <div>
            <a href={tool.link} target="_blank">
              {tool.link}
            </a>
          </div>

          {tool.lead && <div className="c-post__article-content u-body ">{tool.lead}</div>}

          <div className="c-tools-info">
            <div className="u-body--dark-grey c-tools-description">
              <BlockContent blocks={tool.description} serializers={serializers} />
              {tool.strengths?.length > 0 && (
                <>
                  <p className="c-tools-label u-margin-top">Strengths</p>
                  <BlockContent blocks={tool.strengths} serializers={serializers} />
                </>
              )}
              {tool.limitations?.length > 0 && (
                <>
                  <p className="c-tools-label">Limitations</p>
                  <BlockContent blocks={tool.limitations} serializers={serializers} />
                </>
              )}
            </div>
            <div className="u-body--dark-grey c-tools-data">
              {tool.publisher && (
                <div className="c-tools-label-value">
                  <p className="c-tools-label">Published by</p>
                  <p className="c-tools-value">{tool.publisher} </p>
                </div>
              )}
              {tool.category && (
                <div className="c-tools-label-value">
                  <p className="c-tools-label">Analysis type</p>
                  <p className="c-tools-value">{tool.category} </p>
                </div>
              )}
              {tool.regions && (
                <div className="c-tools-label-value">
                  <p className="c-tools-label">Geographic coverage</p>
                  {tool.regions.map(region => (
                    <p className="c-tools-value">{region} </p>
                  ))}
                </div>
              )}
              {(tool.timeframe_from || tool.timeframe_to) && (
                <div className="c-tools-label-value">
                  <p className="c-tools-label">Timeframe</p>
                  <p className="c-tools-value">
                    {tool.timeframe_from && tool.timeframe_from}
                    {' - '}
                    {tool.timeframe_to ? tool.timeframe_to : 'present'}
                  </p>
                </div>
              )}
              {tool.frequency && (
                <div className="c-tools-label-value">
                  <p className="c-tools-label">Frequency</p>
                  <p className="c-tools-value">{tool.frequency} </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
