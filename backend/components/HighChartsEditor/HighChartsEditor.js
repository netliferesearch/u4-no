import React from 'react';
import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'

const scriptsToLoad = [
  'https://code.highcharts.com/stock/highstock.js',
  'https://code.highcharts.com/highcharts-more.js',
  'https://code.highcharts.com/highcharts-3d.js',
  'https://code.highcharts.com/modules/data.js',
  'https://code.highcharts.com/modules/exporting.js',
  'https://code.highcharts.com/modules/funnel.js',
  'https://code.highcharts.com/modules/solid-gauge.js',
  'https://code.highcharts.com/modules/series-label.js',
  '/static/highcharts-editor.min.js'
]

const stylesToLoad = [
  '/static/highcharts-editor.min.css'
]



export default class HighChartsEditor extends React.Component {

  constructor(props) {
    super()
    const {value = {}} = props
    const {htmlStr = ''} = value
    /**
     * We need to use state and only flush content changes to Sanity when the
     * component is about to unmount. This is because the component will abruptly
     * reload and misplace the cursor if we call onChange while the user is editing.
     */
    this.state = {
      content: htmlStr,
    }
  }

  handleEditorChange = value => {
    this.setState({
      content: value
    })
  };

  componentDidMount() {
    this.loadHighChartsEditor()
  }

  loadHighChartsEditor = () => {
    stylesToLoad.forEach(url => {
      if (document.querySelector(`[href="${url}"]`)) {
        return // css already added
      }
      const linkNode = document.createElement("link");
      linkNode.type = "text/css";
      linkNode.rel = "stylesheet";
      linkNode.setAttribute('href', url);
      document.head.appendChild(linkNode);
    })

    // TODO: Loop over highcharts nodes and add to DOM.
    // alternatively use iframe to load the standalone example.

  }

  componentWillUnmount() {
    this.state.editorScriptNodes.forEach(node => document.head.removeChild(node))
    document.head.removeChild(this.state.editorCssNode)
    window.highed = null
    window.Highcharts = null
  }

  onHighEdLoaded = () => {
    console.log('Highed was loaded', window.highed)
    if (!window.highed) {
      console.log('Failed to load highed editor')
      return
    }
    const editor = window.highed.Editor('highcharts-editor');
    editor.on('ChartChange', this.handleEditorChange);
  }

  handleEditorChange = () => {
    const {editor} = this.state
    if (editor) {
      console.log('Editor change', editor.getEmbeddableHTML())
      console.log('Editor change', editor.getEmbeddableJSON())
    }
  }

  focus = () => {
    // TODO: Focus TinyMCE editor after opening.
  }

  render() {
    const {content = ''} = this.state || {}
    return (
      <div id="highcharts-editor" />
    );
  }
}
