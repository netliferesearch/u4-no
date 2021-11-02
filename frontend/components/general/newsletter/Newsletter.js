import React from 'react';
import { SubmitButton } from '../buttons';

export const Newsletter = ({
  cta = 'Never miss U4 news again. Sign up',
  title = 'Your email address',
  text1 = 'We share research and evidence to help international development actors get sustainable results',
  text2 = 'Ground breaking reports, news and opinons to fight corrupution worldwide',
  button = 'Submit',
  link = 'http://eepurl.com/dtV9Df',
}) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const mailchimpUrl =
      'https://cmi.us16.list-manage.com/subscribe?u=e5ddae636e7550347b5fc48d3&id=387c25c3a9';
    document.location.href = `${mailchimpUrl}&MERGE0=${e.target.email.value}`;
  };

  return (
    <div className="c-newsletter">
      <div className="c-newsletter__content">
        <h4 className="u-secondary-heading u-secondary-h1 u-text--white u-detail--white">{cta}</h4>
        {text2 && <p className="c-newsletter__text u-hidden--desktop">{text2}</p>}
        <form onSubmit={onFormSubmit}>
          <div className="c-newsletter__form-content">
            <input className="c-newsletter__input" type="email" name="email" placeholder={title} />
            <SubmitButton text={button} />
          </div>
        </form>
        {text1 && <p className="c-newsletter__text u-hidden--tablet">{text1}</p>}
      </div>
    </div>
  );
};
