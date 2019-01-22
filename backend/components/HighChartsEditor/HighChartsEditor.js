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

  componentWillUnmount() {
    const {editor} = this.state
    if (!editor) {
      return
    }
    // when unloading we save the iframe data.
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

  componentDidMount() {
    const mountNode = document.getElementById('highed-mountpoint')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '800px')
    iframe.setAttribute('id', 'highed-editor')
    iframe.setAttribute('src', '/static/standalone.html')
    iframe.onload = () => this.onEditorIframeLoaded(iframe)
    mountNode.appendChild(iframe)
  }

  onEditorIframeLoaded = (iframe) => {
    const { value = {}} = this.props
    const {jsonStr = ''} = value
    const { data = {}, ...options } = JSON.parse(jsonStr) || {}
    iframe.contentWindow.editorPayload = {
      options: Object.keys(options) ? options : null,
      csvData: data.csv,
      cb: (highedEditor) => {
        console.log('iframe callback was called', highedEditor)
        highedEditor.on('ChartChange', this.handleEditorChange)
        this.setState({
          editor: highedEditor
        })
      }
    }
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
      <div id="highed-mountpoint" />
    );
  }
}
