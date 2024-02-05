import { Button, Flex, Inline } from '@sanity/ui';
import { useFormValue } from 'sanity';
import { buildUrl, previewUrl } from './buildUrl';
import { Link } from 'sanity/router';

const previewDomain = 'https://preview.u4.no';

export default function PreviewLinksField() {
  const document = useFormValue([]);
  const isDraft = document._id?.startsWith('drafts.');
  const isPublication = document._type === 'publication';
  const hasSlug = document?.slug?.current;

  return (
    <Flex justify="flex-end">
      <Inline space={2}>
        {isDraft && (
          <Link
            href={`${previewDomain}/${previewUrl(document)}`}
            target="_blank"
            title="Preview draft page"
          >
            <Button
              mode="ghost"
              padding={2}
              space={2}
              text="Preview"
              aria-label="Preview draft page"
            />
          </Link>
        )}
        {isPublication && (
          <Link
            href={`${previewDomain}/${previewUrl(document)}/shortversion`}
            target="_blank"
            title="Preview short version"
          >
            <Button
              mode="ghost"
              padding={2}
              text="Preview short version"
              aria-label="Preview short version"
            />
          </Link>
        )}
        {isPublication && (
          <Link
            href={`${previewDomain}/previewpdf/${document._type}/${document._id}.pdf`}
            target="_blank"
            title="Preview draft as pdf"
          >
            <Button mode="ghost" padding={2} text="Preview pdf" aria-label="Preview pdf" />
          </Link>
        )}
        {hasSlug && (
          <Link
            href={`${previewDomain}/${buildUrl({ _type: document._type, slug: document.slug })}`}
            target="_blank"
            title="View page on site"
          >
            <Button mode="ghost" padding={2} text="View" aria-label="View page on site" />
          </Link>
        )}
        {hasSlug && isPublication && (
          <Link
            href={`${previewDomain}/publications/${document.slug.current}.pdf`}
            target="_blank"
            title="View pdf on site"
          >
            <Button mode="ghost" padding={2} text="View pdf" aria-label="View pdf on site" />
          </Link>
        )}
      </Inline>
    </Flex>
  );
}
