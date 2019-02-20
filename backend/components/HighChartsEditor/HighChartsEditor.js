import React from 'react';
import throttle from 'lodash/throttle'
import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'

export default class HighChartsEditor extends React.Component {

  /**
   * We need to use state and only flush content changes to Sanity when the
   * component is about to unmount. This is because the component will abruptly
   * reload and misplace the cursor if we call onChange while the user is editing.
   */
  state = {
    editor: null
  }

  componentWillUnmount() {
    // when unloading we save the iframe data.
    this.saveProjectData()
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
    iframe.contentWindow.editorReadyCallback = (editor) => {
      const duration = 10000 // 10 seconds
      const throttledSaveProjectData = throttle(this.saveProjectData, duration)
      editor.on('ChartChangedLately', throttledSaveProjectData)
      this.setState({editor}, throttledSaveProjectData)
    }
  }

  loadProjectData = () => {
    const {editor} = this.state
    if (!editor) {
      return
    }
    const { value: { editorConfigWithData } = {} } = this.props
    if (!editorConfigWithData) {
      return
    }
    try {
      editor.chart.loadProject(JSON.parse(editorConfigWithData))
    } catch (e) {
      console.log('Failed to load higcharts editor', e)
    }
  }

  saveProjectData = () => {
    const {editor} = this.state
    if (!editor) {
      return
    }
    const jsonStr = editor.getEmbeddableJSON()
    const htmlStr = editor.getEmbeddableHTML()
    const svgStr = editor.getEmbeddableSVG()
    const editorConfigWithData = editor.chart.toProjectStr()
    const patches = PatchEvent.from([
      setIfMissing({}),
      jsonStr ? set(JSON.stringify(jsonStr), ['jsonStr']) : unset(['jsonStr']),
      editorConfigWithData ? set(JSON.stringify(editorConfigWithData), ['editorConfigWithData']) : unset(['editorConfigWithData']),
      htmlStr ? set(htmlStr, ['htmlStr']) : unset(['htmlStr']),
      svgStr ? set(svgStr, ['svgStr']) : unset(['svgStr'])
    ])
    this.props.onChange(patches)
    console.log('saved data', editorConfigWithData)
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
