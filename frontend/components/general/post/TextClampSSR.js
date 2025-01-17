export const TextClampSSR = ({ text = '', lines = 3 }) => {
  return (
    <div className="c-text-clamp" style={{ WebkitLineClamp: lines }}>
      {text}
    </div>
  );
};
