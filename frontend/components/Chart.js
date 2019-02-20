import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import serializers from './serializers';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
if (typeof window !== 'undefined') {
  // See readme for docs on how to load more charting modules if need be.
  // Can only be loaded client-side. Not on server.
  // https://github.com/highcharts/highcharts-dist#load-highcharts-as-a-commonjs-module
  require('highcharts/highcharts-more')(Highcharts);
}

const parseJson = jsonStr => {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.log('Failed to parse json', {
      jsonStr,
      error: e,
    });
    return null;
  }
};

// It takes a while for Highcharts to load so we add a loading state with
// this component
export default class Chart extends React.Component {
  state = {
    didChartLoad: false,
  };

  highchartsCallback = () => this.setState({ didChartLoad: true });

  render() {
    const { title, caption, jsonStr } = this.props;
    if (!jsonStr) {
      return null; // nothing to render
    }
    const options = parseJson(jsonStr);
    const highChartsProps = {
      highcharts: Highcharts,
      options,
    };
    const { didChartLoad } = this.state;
    return (
      <Fragment>
        {!didChartLoad && <div>Loading chart ...</div>}
        <div className={`c-chart ${!didChartLoad && 'c-chart--is-loading'}`}>
          <h3
            id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
            className="c-chart__title"
          >
            {title}
          </h3>
          <HighchartsReact {...highChartsProps} callback={this.highchartsCallback} />
          <div className="c-chart__caption">
            <BlockContent blocks={caption} serializers={serializers} />
          </div>
        </div>
      </Fragment>
    );
  }
}

Chart.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.array,
  jsonStr: PropTypes.string,
  htmlStr: PropTypes.string,
  svgStr: PropTypes.string,
};

Chart.defaultProps = {
  title: '',
  caption: [],
  htmlStr: '',
  jsonStr: '',
  svgStr: '',
};
