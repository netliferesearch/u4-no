const Feature = ({ 
  title = '', 
  text = '', 
  iconUrl = '',
 }) => (
  <div className="c-feature">
    {/* {icon && <div className="c-features__icon">{icon()}</div>} */}
    {iconUrl && (
      <div className="c-features__icon">
        <img src={iconUrl} alt={title} loading="lazy" width="90" />
      </div>
    )}
    {title && <h2 className="u-secondary-h2 u-text--light-blue">{title}</h2>}
    {text && <p className="u-body u-text--light-blue">{text}</p>}
  </div>
);

export default Feature;
