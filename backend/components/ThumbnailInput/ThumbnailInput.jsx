import React, { useState } from 'react';
import { Box, Button, Flex, Spinner, useToast } from '@sanity/ui';
import { useClient, useFormValue, set, unset } from 'sanity';
import { ImageIcon } from '@sanity/icons';

const pngGeneratorApi = 'https://www.u4.no/api/get-png';
const debug = true;

export const ThumbnailInput = props => {
  const { type, value, onChange } = props;
  const client = useClient({ apiVersion: '2021-06-07' });
  const fileFieldValue = useFormValue(['pdfFile']);
  const slug = useFormValue(['slug', 'current']);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleGenerateClick = async () => {
    const { asset } = fileFieldValue;
    const assetId = asset?._ref ? asset._ref.split('-')[1] : null;
    debug && console.log('Generating thumbnail for:', fileFieldValue);

    setIsLoading(true);
    try {
      // generate png and upload
      const response = await fetch(`${pngGeneratorApi}?assetId=${assetId}`, {
        method: 'GET',
      });
      debug && console.log('Response from /api/get-png:', response);

      if (!response.ok) {
        throw new Error('Png generation failed');
      }
      // get the blob
      const blob = await response.blob();
      debug && console.log('Blob received:', blob);

      // create a file from the blob
      const pngFilename = `${slug}.png`;
      const file = new File([blob], pngFilename, { type: 'image/png' });
      debug && console.log('File created', file);

      // create a Sanity asset
      const pngAsset = await client.assets.upload('image', file, {
        filename: pngFilename,
        contentType: 'image/png',
      });
      debug && console.log('Asset created:', pngAsset);

      // set the value of the pdfThumbnail field
      onChange(set({ _type: 'image', asset: { _ref: pngAsset._id } }));
      debug && console.log('Png uploaded and field updated:', pngAsset);
      toast.push({ status: 'success', title: 'Success', description: 'Png generated' });
    } catch (error) {
      console.error('Error fetching png:', error);
      toast.push({ status: 'error', title: 'Error', description: error.message });
      onChange(unset());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex style={{ gap: '0.5em' }}>
      <Button
        text="Generate"
        iconRight={isLoading ? <Spinner muted size={2} /> : <ImageIcon />}
        onClick={handleGenerateClick}
        tone={fileFieldValue ? 'default' : 'positive'}
      />
      <Box flex={1}>{props.renderDefault(props)}</Box>
    </Flex>
  );
};
