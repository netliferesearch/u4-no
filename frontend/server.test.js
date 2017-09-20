require('isomorphic-fetch');

test('server should return 404 for missing page', async () => {
  const { status } = await fetch(
    `http://localhost:${process.env.PORT || 3000}/somepagethatisnotthere`,
  );
  expect(status).toBe(404);
});

describe('main areas', () => {
  const origin = `http://localhost:${process.env.PORT || 3000}`;
  const pathsToTest = [
    '/',
    '/topics',
    '/topics/a8f6ad54-3a41-4ceb-b361-4febfb6fe67d',
    '/publications',
    '/publications/f62b433d-9bbf-4bcb-8a4d-9aed37e5afcd',
  ];
  pathsToTest.map(path => `${origin}${path}`).map(async (urlToTest) => {
    test(`Testing '${urlToTest}'`, async () => {
      const { status } = await fetch(urlToTest);
      expect(status).toBe(200);
    });
  });
});
