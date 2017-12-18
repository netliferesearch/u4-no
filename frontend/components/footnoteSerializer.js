export default (key = '') => ({
  types: {
    span: ({ node, children }) => {
      console.log(node, children);
      return null
    },
    block: ({ node, children }) => {
      if (!key) return null;
      const style = node.style || 'normal';
      return (
        <li className="footnote" id={`fn:${key}`}>
          {children}
        </li>
      );
    },
  },
});
