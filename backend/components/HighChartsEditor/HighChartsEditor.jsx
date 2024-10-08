import { Card, Heading, Label, Select, Stack, TextArea, TextInput } from '@sanity/ui';
import { Fragment, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { set } from 'sanity';

export default function HighChartsEditor(props) {
  const { members, onChange, value = {} } = props;

  const titleField = members.find(({ name }) => name === 'title');
  const captionField = members.find(({ name }) => name === 'caption');
  const sizeField = members.find(({ name }) => name === 'size');

  // Patch input data to sanity
  // This function is debounced to prevent input lag
  const inputChangeHandler = useDebouncedCallback((fieldName, newValue) => {
    if (value[fieldName] === newValue) return;

    const nextValue = {
      ...value,
      [fieldName]: newValue,
    };

    onChange(set(nextValue));
  }, 100);

  // Patch chart data to sanity
  function chartChangeHandler(editor) {
    if (!editor) return;
    const editorConfigJson = editor.chart.options.full;
    const nextValue = {
      ...value,
      editorConfigWithData: editor.chart.toProjectStr(),
      svgStr: editor.getEmbeddableSVG(),
      htmlStr: editor.getEmbeddableHTML(),
      jsonStr: editorConfigJson ? JSON.stringify(editorConfigJson) : '',
    };

    // Todo: double check that chart gets updated properly
    onChange(set(nextValue));
  }

  // Load data from sanity into the HighCharts editor
  function loadProjectData(editor) {
    const { editorConfigWithData } = value;
    if (!editor || !editorConfigWithData) return;

    try {
      editor.chart.loadProject(JSON.parse(editorConfigWithData));
    } catch (e) {
      console.log('Failed to load highcharts editor', e);
    }
  }

  // Load data and setup change event when the HighCharts editor is ready
  function onEditorIframeLoaded(iframe) {
    iframe.contentWindow.editorReadyCallback = editorInstance => {
      editorInstance.chart.on('ChartChangeLately', () => chartChangeHandler(editorInstance));
      loadProjectData(editorInstance);
    };
  }

  // Mount HighChart editor iframe when component mounts
  useEffect(() => {
    // Append iframe to 'highed-mountpoint' on component mount
    const mountNode = document.getElementById('highed-mountpoint');
    if (!mountNode) return;

    const iframe = document.createElement('iframe');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '800px');
    iframe.setAttribute('id', 'highed-editor');
    iframe.setAttribute('src', '/highcharts-iframe-content.html');
    iframe.onload = () => onEditorIframeLoaded(iframe);
    mountNode.appendChild(iframe);

    // Remove editor on cleanup
    return () => mountNode.removeChild(iframe);
  }, []);

  if (!titleField || !captionField || !sizeField)
    return (
      <pre>
        {JSON.stringify({
          titleField: Boolean(titleField),
          captionField: Boolean(captionField),
          sizeField: Boolean(sizeField),
        })}
      </pre>
    );

  return (
    <Fragment>
      <Heading size={1}>HighChartsEditor</Heading>
      <Card padding={4} radius={2} shadow={1} marginY={4}>
        <Stack space={4}>
          <Stack space={2}>
            <Label htmlFor={titleField.name}>Title</Label>
            <TextInput
              id={titleField.name}
              fontSize={2}
              onChange={event => {
                inputChangeHandler(titleField.name, event.currentTarget.value);
              }}
              padding={3}
              defaultValue={titleField.field.value}
            />
          </Stack>

          <Stack space={2}>
            <Label htmlFor={captionField.name}>Caption</Label>
            <TextArea
              id={captionField.name}
              fontSize={2}
              rows={5}
              padding={3}
              // Convert plain text to portable text, because thats what the schema expects
              onChange={event => {
                inputChangeHandler(
                  captionField.name,
                  plainTextToPortableText(event.currentTarget.value)
                );
              }}
              // Convert portable text back to plain text to make it editable in text area
              defaultValue={blocksToText(captionField.field.value)}
            />
          </Stack>

          <Stack space={2}>
            <Label htmlFor={sizeField.name}>Size</Label>
            <Select
              id={sizeField.name}
              fontSize={2}
              onChange={event => {
                inputChangeHandler(sizeField.name, event.currentTarget.value);
              }}
              padding={3}
              defaultValue={sizeField.field.value}
            >
              {sizeField.field.schemaType.options.list.map(option => (
                <option key={option.title} value={option.value}>
                  {option.title}
                </option>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Card>
      <div id="highed-mountpoint" />
    </Fragment>
  );
}

// Todo: move these functions somewhere else

// Convert Sanity's portable text into plain string.
function blocksToText(blocks, opts = {}) {
  const defaults = {};
  const options = Object.assign({}, defaults, opts);
  if (!blocks) return '';
  return blocks
    .map(block => {
      if (block._type === 'heading') {
        const { headingValue = '' } = block;
        return headingValue;
      } else if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }
      return block.children.map(child => child.text).join('');
    })
    .join(' ');
}

function plainTextToPortableText(plainText) {
  // Split the text into paragraphs based on new lines
  const paragraphs = plainText.split('\n').filter(paragraph => paragraph.trim() !== '');
  // Map each paragraph to a Portable Text block
  const blocks = paragraphs.map(paragraph => ({
    _key: '1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: '1',
        _type: 'span',
        text: paragraph,
        marks: [],
      },
    ],
  }));
  return blocks;
}
