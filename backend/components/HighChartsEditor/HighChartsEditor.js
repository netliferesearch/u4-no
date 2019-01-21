import React from 'react';
import * as highed from './highcharts-editor.complete.0.2.2'
// import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'

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
      editor: null
    }
  }

  handleEditorChange = value => {
    this.setState({
      content: value
    })
  };

  componentDidMount() {
    console.log('highed', highed)

    // const editor = highed.Editor('highcharts-editor')
    // editor.on('ChartChange', this.handleEditorChange)
    // this.setState({
    //   editor
    // })
  }

  handleEditorChange = () => {
    const {editor} = this.state
    if (editor) {
      console.log('Editor change', editor.getEmbeddableHTML())
      console.log('Editor change', editor.getEmbeddableJSON())
    }
  }

  componentWillUnmount() {
    const {content: value} = this.state || {}
    const patches = PatchEvent.from([
      setIfMissing({}),
      value ? set(value, ['htmlStr']) : unset(['htmlStr'])
    ])
    this.props.onChange(patches)
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
