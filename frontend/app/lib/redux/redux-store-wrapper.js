import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';

import { initStore, updateReadingProgress } from './redux-store';

const mapDispatchToProps = dispatch => ({
  updateReadingProgress: bindActionCreators(updateReadingProgress, dispatch),
});

export const wrapInRedux = Component => withRedux(initStore, null, mapDispatchToProps)(Component);
