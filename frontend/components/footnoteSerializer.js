export default (key) => ({
  types: {
    span: ({ node, children }) => {
      console.log(node, children);
    },
    block: ({ node, children }) => {
      const style = node.style || 'normal';

      return (
        <li className="footnote" id={`fn:${key}`}>
          {children}
        </li>
      );
    },
  },
});
