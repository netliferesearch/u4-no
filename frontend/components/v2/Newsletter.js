import React from 'react';
import { Link } from '../../routes';
import BEMHelper from 'react-bem-helper';
import { SubmitButton } from './buttons';

const classes = BEMHelper({
  name: 'newsletter',
  prefix: 'c-',
});

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
    <div {...classes(null, null)}>
      <div {...classes('content')}>
        <h4 {...classes('cta')}>{cta}</h4>
        <p className="c-newsletter__text u-hidden--desktop">{text2}</p>
        <form onSubmit={onFormSubmit}>
          <div {...classes('title-wrapper')}>
            <input {...classes('input')} type="email" name="email" placeholder={title} />
            {/* <button type="submit" value="Subscribe">
              {button}
            </button> */}
            <SubmitButton text={button} />
          </div>
        </form>
        {false && (
          <Link to={link}>
            <a {...classes('title-wrapper')}>
              <h3 {...classes('title')}>{title}</h3>
              <span {...classes('title-arrow')} />
            </a>
          </Link>
        )}
        <p className="c-newsletter__text u-hidden--tablet">{text1}</p>
      </div>
    </div>
  );
};

// class Newsletter extends Component {
//   constructor(props) {
//     super(props);
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//   }

//   onFormSubmit(e) {
//     e.preventDefault();
//     const mailchimpUrl =
//       'https://cmi.us16.list-manage.com/subscribe?u=e5ddae636e7550347b5fc48d3&id=387c25c3a9';
//     document.location.href = `${mailchimpUrl}&MERGE0=${e.target.email.value}`;
//   }

//   scrollToTop(e) {
//     window.scrollTo(0, 0);
//   }

//   render() {
//     const {
//       cta = 'Never miss U4 news again. Sign up',
//       title = 'Your email address',
//       text1 = 'We share research and evidence to help international development actors get sustainable results',
//       text2 = 'Ground breaking reports, news and opinons to fight corrupution worldwide',
//       button = 'Submit',
//       link = 'http://eepurl.com/dtV9Df',
//     } = this.props;

//     return (
//       <div {...classes(null, null)}>
//         <div {...classes('content')}>
//           <h4 {...classes('cta')}>{cta}</h4>
//           <p className="c-newsletter__text u-hidden--desktop">{text2}</p>
//           <form onSubmit={this.onFormSubmit}>
//             <div {...classes('title-wrapper')}>
//               <input {...classes('input')} type="email" name="email" placeholder={title} />
//               {/* <button type="submit" value="Subscribe">
//                 {button}
//               </button> */}
//               <SubmitButton text="Submit" />
//             </div>
//           </form>
//           {false && (
//             <Link to={link}>
//               <a {...classes('title-wrapper')}>
//                 <h3 {...classes('title')}>{title}</h3>
//                 <span {...classes('title-arrow')} />
//               </a>
//             </Link>
//           )}
//           <p className="c-newsletter__text u-hidden--tablet">{text1}</p>
//         </div>
//       </div>
//     );
//   }
// }

// Newsletter.defaultProps = {
//   label: 'Never miss U4 news again. Sign up',
//   placeholder: 'Your email address',
//   link: '#',
// };

// export default Newsletter;
