import React from 'react';
import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'

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
      editor: null,
      intervalID: null
    }
  }

  handleEditorChange = value => {
    this.setState({
      content: value
    })
  };

  onEditorLoaded = () => {
    const iframe = document.getElementById('highed-editor')
    const intervalID = setInterval(() => {
      console.log('Polling for editor')
      const {highedEditor} = iframe.contentWindow
      if (highedEditor) {
        clearInterval(intervalID)
        const { value = {}} = this.props
        const {jsonStr = ''} = value
        if (jsonStr) {
          // load saved data into newly opened editor
          highedEditor.chart.data.json(JSON.parse(jsonStr))
        }
        highedEditor.on('ChartChange', this.handleEditorChange)
        this.setState({
          intervalID: null,
          editor: highedEditor
        })
      }
    }, 200)
    this.setState({intervalID})
  }

  componentWillUnmount() {
    const {intervalID, editor} = this.state
    if (intervalID) {
      clearInterval(intervalID)
    }
    const jsonStr = editor.getEmbeddableJSON()
    const htmlStr = editor.getEmbeddableHTML()
    const svgStr = editor.getEmbeddableSVG()
    const patches = PatchEvent.from([
      setIfMissing({}),
      jsonStr ? set(JSON.stringify(jsonStr), ['jsonStr']) : unset(['jsonStr']),
      htmlStr ? set(htmlStr, ['htmlStr']) : unset(['htmlStr']),
      svgStr ? set(svgStr, ['svgStr']) : unset(['svgStr'])
    ])
    this.props.onChange(patches)
  }

  handleEditorChange = () => {
    console.log('handleEditorChange()')
    const {editor} = this.state
    if (!editor) {
      return // do nothing
    }
    console.log('Editor change', editor.getEmbeddableHTML())
    console.log('Editor change', editor.getEmbeddableJSON())
  }

  focus = () => {
    // TODO: Focus editor
  }

  render() {
    const {content = ''} = this.state || {}
    return (
      <iframe id="highed-editor" width="100%" height="800px" onLoad={this.onEditorLoaded} src="/static/standalone.html"></iframe>
    );
  }
}
