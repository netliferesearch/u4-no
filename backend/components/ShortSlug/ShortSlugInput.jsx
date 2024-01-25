import { Box, Button, Card, Code, Flex, Text, TextInput, Tooltip } from '@sanity/ui'
import React, { useCallback } from 'react'
import { PatchEvent, set, unset, useClient, useFormValue } from 'sanity'

// return random string of given length
const getRandomString = () => {
  const length = 3;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default function ShortSlugInput( props ) {
  const { value, elementProps, onChange, schemaType } = props;
  const {options} = schemaType;
  const {urlPrefix} = options;
  const document = useFormValue([]);

  const client = useClient({apiVersion: '2021-10-21'});

  // return true if no other document in database has the same shortslug
  const isGloballyUnique = (slug, _id) => {
    const id = _id.replace(/^drafts\./, '');
    const params = {
      draft: `drafts.${id}`,
      published: id,
      slug,
    };
    const query = `!defined(*[!(_id in [$draft, $published]) && shortSlug.current == $slug][0]._id)`;
    return client.fetch(query, params);
  };

  // create new random string until unique
  const getUniqueSlug = (_id, _type) => {
    const randomString = getRandomString();
    // if unique return value else call recursively until unique
    return isGloballyUnique(randomString, _id) ? randomString : getUniqueSlug(_id, _type);
  };
  
  // generate new slug and set value (on button click)
  async function generateSlug() {
    const newSlug = getUniqueSlug(document._id, document._type);
    updateValue({current: newSlug});
  }

  // set value
  function updateValue(newValue) {
    onChange(PatchEvent.from(newValue ? set(newValue) : unset()))   
  }

  // set value (when edited manually)
  const handleChange = useCallback((event) => {
    onChange(event.currentTarget.value ? set({current: event.currentTarget.value}) : unset())
	}, [onChange])

  const onBlur = useCallback(
    (event) => {
      updateValue({current: event.currentTarget.value})
    }
  )
  
  // copy shorturl to clipboard
  const copyShortUrl = async () => {
    const urlValue = urlPrefix + props.value.current;
    try {
      await navigator.clipboard.writeText(urlValue);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Flex style={{ gap: '0.5em' }} align="center">
      {urlPrefix && (
        <Tooltip
          content={
            <Box padding={2}>
              <Text>{urlPrefix}</Text>
            </Box>
          }
        >
          <Card data-no-generate={!schemaType.options?.source}>
            <Code size={1}>{urlPrefix}</Code>
          </Card>
        </Tooltip>
      )}
      <Box flex={3}>
        <TextInput
          value={value?.current || ''}
          readOnly={props.readOnly}
          {...props.elementProps}
          onChange={handleChange}
          onBlur={onBlur}
        />
      </Box>
      {schemaType.options?.source && (
        <>
        <Button
          mode="ghost"
          type="button"
          disabled={props.readOnly}
          onClick={generateSlug}
          text={'Generate'}
        />
        <Button
          mode="ghost"
          type="button"
          disabled={props.readOnly}
          onClick={copyShortUrl}
          text={'Copy'}
        />
      </>
      )}
    </Flex>
  );
}