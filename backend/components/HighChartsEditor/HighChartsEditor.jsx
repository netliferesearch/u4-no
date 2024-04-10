// import React, { Fragment } from 'react';
// import PatchEvent, {set, unset, setIfMissing} from 'part:@sanity/form-builder/patch-event'
// import { FormBuilderInput } from "part:@sanity/form-builder";
import { Card, TextInput, Select, Stack } from '@sanity/ui';
import { Fragment, useEffect, useState } from 'react';

export default function HighChartsEditor(props) {
  console.log('HighChartsEditor', props);
  // const { fields: { members = [] } = {}, name: { title, caption, size } = {}, onFocus } = props;
  console.log(props.members, props.name, props.onFocus);
  const { members: fields = [], onPathFocus: onFocus } = props;
  const titleField = fields.find(({ name = '' }) => name === 'title');
  const captionField = fields.find(({ name = '' }) => name === 'caption');
  const sizeField = fields.find(({ name = '' }) => name === 'size');

  console.log({ titleField, captionField, sizeField });

  const [editor, setEditor] = useState(null);
  const [svgStr, setSvgStr] = useState('');
  const [htmlStr, setHtmlStr] = useState('');

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [size, setSize] = useState('');

  useEffect(
    () => {
      loadProjectData(editor);
    },
    [editor]
  );

  useEffect(() => {
    const mountNode = document.getElementById('highed-mountpoint');
    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '800px');
    iframe.setAttribute('id', 'highed-editor');
    iframe.setAttribute('src', '/highcharts-iframe-content.html');
    iframe.onload = () => onEditorIframeLoaded(iframe);
    mountNode.appendChild(iframe);
  }, []);

  const chartChangeHandler = editor => {
    console.log(editor);
    if (!editor) {
      return;
    }
    setSvgStr(editor.getEmbeddableSVG());
    setHtmlStr(editor.getEmbeddableHTML());
    console.log('chartChangeHandler', svgStr, htmlStr);
  };

  const onEditorIframeLoaded = iframe => {
    iframe.contentWindow.editorReadyCallback = editor => {
      console.log('editorReadyCallback', editor);
      window.highchartsEditorInstance = editor;
      editor.on('ChartChangedLately', chartChangeHandler(editor));
      setEditor(editor);
    };
  };

  const loadProjectData = editor => {
    if (!editor) {
      return;
    }
    console.log({ editor, props });
    const { value: { editorConfigWithData } = {} } = props;
    console.log('loadProjectData', editorConfigWithData);
    if (!editorConfigWithData) {
      return;
    }
    try {
      editor.chart.loadProject(JSON.parse(editorConfigWithData));
    } catch (e) {
      console.log('Failed to load higcharts editor', e);
    }
  };

  const formBuilderInputHandler = (prefix, patchEvent) => {
    console.log('formBuilderInputHandler', prefix, patchEvent);
    const { onChange } = props;
    onChange(patchEvent.prefixAll(prefix));
  };

  return (
    <Fragment>
      <div>HighChartsEditor</div>
      <Card padding={2} radius={2} shadow={1}>
        <Stack space={3}>
          <label htmlFor={titleField.name}>Title</label>
          <TextInput
            id={titleField.name}
            fontSize={[2, 2, 3, 4]}
            onChange={event => setTitle(event.currentTarget.value)}
            padding={[3, 3, 4]}
            value={title}
          />
          <label htmlFor={captionField.name}>Caption</label>
          <TextInput
            id={captionField.name}
            fontSize={[2, 2, 3, 4]}
            onChange={event => setCaption(event.currentTarget.value)}
            padding={[3, 3, 4]}
            value={caption}
          />
          <label htmlFor={sizeField.name}>Size</label>
          <Select
            id={sizeField.name}
            fontSize={[2, 2, 3, 4]}
            onChange={event => setSize(event.currentTarget.value)}
            padding={[3, 3, 4]}
            value={size}
          >
            {sizeField.field.schemaType.options.list.map(option => (
              <option key={option.title} value={option.value}>
                {option.title}
              </option>
            ))}
          </Select>
        </Stack>
      </Card>
      <div id="highed-mountpoint" />
    </Fragment>
  );
}

export function HighChartsEditorPreview() {
  return null;
}

// export default class HighChartsEditor extends React.Component {

//   /**
//    * We need to use state and only flush content changes to Sanity when the
//    * component is about to unmount. This is because the component will abruptly
//    * reload and misplace the cursor if we call onChange while the user is editing.
//    */
//   state = {
//     editor: null,
//     svgStr: '',
//     htmlStr: ''
//   }

//   componentWillUnmount() {
//     // when unloading we save the iframe data.
//     this.saveProjectData()
//   }

//   componentDidMount() {
//     const mountNode = document.getElementById('highed-mountpoint')
//     const iframe = document.createElement('iframe')
//     iframe.setAttribute('width', '100%')
//     iframe.setAttribute('height', '800px')
//     iframe.setAttribute('id', 'highed-editor')
//     iframe.setAttribute('src', '/static/highcharts-iframe-content.html')
//     iframe.onload = () => this.onEditorIframeLoaded(iframe)
//     mountNode.appendChild(iframe)
//   }

//   chartChangeHandler = () => {
//     const {editor} = this.state
//     if (!editor) {
//       return
//     }
//     this.setState({
//       svgStr: editor.getEmbeddableSVG(),
//       htmlStr: editor.getEmbeddableHTML()
//     })
//   }

//   onEditorIframeLoaded = (iframe) => {
//     iframe.contentWindow.editorReadyCallback = (editor) => {
//       window.highchartsEditorInstance = editor
//       editor.on('ChartChangedLately', this.chartChangeHandler)
//       this.setState({editor}, this.loadProjectData)
//     }
//   }

//   loadProjectData = () => {
//     const {editor} = this.state
//     if (!editor) {
//       return
//     }
//     const { value: { editorConfigWithData } = {} } = this.props
//     if (!editorConfigWithData) {
//       return
//     }
//     try {
//       editor.chart.loadProject(JSON.parse(editorConfigWithData))
//     } catch (e) {
//       console.log('Failed to load higcharts editor', e)
//     }
//   }

//   saveProjectData = () => {
//     const {editor, htmlStr, svgStr} = this.state
//     if (!editor) {
//       return
//     }
//     const jsonStr = JSON.stringify(editor.chart.options.full)
//     const editorConfigWithData = editor.chart.toProjectStr()
//     const patches = PatchEvent.from([
//       setIfMissing({}),
//       jsonStr ? set(jsonStr, ['jsonStr']) : unset(['jsonStr']),
//       editorConfigWithData ? set(editorConfigWithData, ['editorConfigWithData']) : unset(['editorConfigWithData']),
//       htmlStr ? set(htmlStr, ['htmlStr']) : unset(['htmlStr']),
//       svgStr ? set(svgStr, ['svgStr']) : unset(['svgStr'])
//     ])
//     this.props.onChange(patches)
//   }

//   focus = () => {
//     // TODO: Focus editor
//   }

//   formBuilderInputHandler = (prefix, patchEvent) => {
//     const {onChange} = this.props
//     onChange(patchEvent.prefixAll(prefix))
//   }

//   render() {
//     const { type: { fields = [] } = {}, value: {title, caption, size} = {}, onFocus } = this.props
//     const titleField = fields.find(({name = ''}) => name === 'title')
//     const captionField = fields.find(({name = ''}) => name === 'caption')
//     const sizeField = fields.find(({name = ''}) => name === 'size')
//     return (
//       <Fragment>
//         <FormBuilderInput {...{...titleField, onChange: (event) => this.formBuilderInputHandler('title', event), value: title, onFocus}}></FormBuilderInput>
//         <FormBuilderInput {...{...captionField, onChange: (event) => this.formBuilderInputHandler('caption', event), value: caption, onFocus}}></FormBuilderInput>
//         <FormBuilderInput {...{...sizeField, onChange: (event) => this.formBuilderInputHandler('size', event), value: size, onFocus}}></FormBuilderInput>
//         <div id="highed-mountpoint" />
//       </Fragment>
//     );
//   }
// }
