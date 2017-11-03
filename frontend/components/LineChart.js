import PropTypes from 'prop-types';
import * as V from 'victory';

const LineChart = ({ rows = [], title = '' }) => (<div className="c-longform-grid__standard">
  {title && <h2>{title}</h2>}
  <V.VictoryChart
    height={400}
    width={400}
    containerComponent={<V.VictoryVoronoiContainer />}
  >
    <V.VictoryGroup
      color="#0079CF"
      labels={d => `y: ${d.y}`}
      labelComponent={
        <V.VictoryTooltip
          style={{ fontSize: 10 }}
        />
      }
      data={rows.slice(1, -1).map(({ columns }) => ({ x: Number(columns[0]), y: Number(columns[1]) }))}
    >
      <V.VictoryLine />
    </V.VictoryGroup>
  </V.VictoryChart></div>
);

LineChart.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

LineChart.defaultProps = {
  title: '',
};

export default LineChart;
