const FootnoteSerializer = (key = '') => ({
  types: {
    span: () => null,
    block: ({ children }) => {
      if (!key) return null;
      return (
        <li className="footnote" id={`fn:${key}`}>
          {children}
        </li>
      );
    },
  },
});

export default FootnoteSerializer