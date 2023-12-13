import languageName from 'helpers/languageName';
import LinkToItem from '../LinkToItem';

export const Translations = ({ translations, language, type = 'publication', currentSlug }) => {

  if (!translations || !translations.length) {
    return null;
  }
  return (
    <div className="c-translations">
      <span className="u-body--small u-text--grey">Also available in</span>{' '}
      {translations.map(
        (item = {}, index) =>
          item.slug &&
          item.title && (
            <LinkToItem type={type} slug={item.slug} key={item._id}>
              <span className="u-body--small">
                <a className="">{languageName({ langcode: item.language })}</a>
                {index + 2 < translations.length && <span>, </span>}
                {index + 2 === translations.length && <span> and </span>}
              </span>
            </LinkToItem>
          )
      )}
    </div>
  );
};

