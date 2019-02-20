import React, { Fragment } from 'react';
import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'
import { FormBuilderInput } from "part:@sanity/form-builder";

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
    iframe.contentWindow.editorReadyCallback = (editor) => this.setState({editor}, this.loadProjectData)
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
    const jsonStr = JSON.stringify(editor.chart.options.full)
    // Saving this just in case.
    const htmlStr = editor.getEmbeddableHTML()
    // TODO: Check why exported svg looks a bit malformed. Could it be because
    // we export svg when the iframe is very small? Or is it the wrong function
    // called?
    const svgStr = editor.getEmbeddableSVG()
    const editorConfigWithData = editor.chart.toProjectStr()
    const patches = PatchEvent.from([
      setIfMissing({}),
      jsonStr ? set(jsonStr, ['jsonStr']) : unset(['jsonStr']),
      editorConfigWithData ? set(editorConfigWithData, ['editorConfigWithData']) : unset(['editorConfigWithData']),
      htmlStr ? set(htmlStr, ['htmlStr']) : unset(['htmlStr']),
      svgStr ? set(svgStr, ['svgStr']) : unset(['svgStr'])
    ])
    this.props.onChange(patches)
  }

  focus = () => {
    // TODO: Focus editor
  }

  formBuilderInputHandler = (prefix, patchEvent) => {
    const {onChange} = this.props
    onChange(patchEvent.prefixAll(prefix))
  }

  render() {
    const { type: { fields = [] } = {}, value: {title, caption} = {}, onFocus } = this.props
    const titleField = fields.find(({name = ''}) => name === 'title')
    const captionField = fields.find(({name = ''}) => name === 'caption')
    return (
      <Fragment>
        <FormBuilderInput {...{...titleField, onChange: (event) => this.formBuilderInputHandler('title', event), value: title, onFocus}}></FormBuilderInput>
        <FormBuilderInput {...{...captionField, onChange: (event) => this.formBuilderInputHandler('caption', event), value: caption, onFocus}}></FormBuilderInput>
        <div id="highed-mountpoint" />
      </Fragment>
    );
  }
}
