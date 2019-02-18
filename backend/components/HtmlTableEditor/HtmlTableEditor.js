import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'

export default class HtmlTableEditor extends React.Component {

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
      content: htmlStr
    }
  }

  handleEditorChange = value => {
    this.setState({
      content: value
    })
  };

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
      <Editor
      id="tinymce-editor"
      apiKey="ivxiggexqgnqeg3xjjiczxw06ed4btfaszkj8g8u2u64ifkt" init={{
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
        toolbar: 'table | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        height: '800'
      }}
      init={{
        content_css: 'static/HtmlTableEditor.css'
      }}
      value={content}
       onEditorChange={this.handleEditorChange}
      />
    );
  }
}
