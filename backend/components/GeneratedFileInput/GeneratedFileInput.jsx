import React, { useState } from 'react';
import { Box, Button, Flex, Spinner, useToast } from '@sanity/ui';
import { useClient, useFormValue, set, unset } from 'sanity';
import { DocumentPdfIcon } from '@sanity/icons';

const pdfGeneratorApi = 'https://www.u4.no/api/get-pdf';
const debug = true;

export const GeneratedFileInput = props => {
  const { type, value, onChange } = props;
  const client = useClient({ apiVersion: '2021-06-07' });
  const docId = useFormValue(['_id']);
  const slug = useFormValue(['slug', 'current']);
  const fileFieldValue = useFormValue(['pdfFile']);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      // generate pdf and upload
      const response = await fetch(`${pdfGeneratorApi}?docId=${docId}`, {
        method: 'GET',
      });
      debug && console.log('Response from /api/get-pdf:', response);

      if (!response.ok) {
        throw new Error('Pdf generation failed');
      }
      // get the blob
      const blob = await response.blob();
      debug && console.log('Blob received:', blob);

      // create a file from the blob
      const pdfFilename = `${slug}.pdf`;
      const file = new File([blob], pdfFilename, { type: 'application/pdf' });
      debug && console.log('File created', file);

      // create a Sanity asset
      const asset = await client.assets.upload('file', file, {
        filename: pdfFilename,
        contentType: 'application/pdf',
      });
      debug && console.log('Asset created:', asset);

      // set the value of the pdfFile field
      onChange(set({ _type: 'file', asset: { _ref: asset._id } }));
      debug && console.log('PDF uploaded and field updated:', asset);
      toast.push({ status: 'success', title: 'Success', description: 'PDF generated' });
    } catch (error) {
      console.error('Error fetching PDF:', error);
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
        iconRight={isLoading ? <Spinner muted size={2} /> : <DocumentPdfIcon />}
        onClick={handleGenerateClick}
        tone={fileFieldValue ? 'default' : 'positive'}
      />
      <Box flex={1}>{props.renderDefault(props)}</Box>
    </Flex>
  );
};
