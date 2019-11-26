export default (key = '') => ({
  types: {
    span: ({ node, children }) => null,
    block: ({ node, children }) => {
      if (!key) return null;
      return <span className="fn">{children}</span>;
    },
  },
});
