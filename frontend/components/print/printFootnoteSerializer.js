export default (key = false) => ({
  types: {
    span: ({ node, children }) => {
      console.log(node, children);
      return null
    },
    block: ({ node, children }) => {
      if (!key) return null;
      return <span className="fn">{children}</span>
    },
  },
});
