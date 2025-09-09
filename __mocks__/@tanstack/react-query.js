// __mocks__/@tanstack/react-query.js
const React = require('react');

module.exports = {
  QueryClient: jest.fn().mockImplementation(() => ({})),
  QueryClientProvider: ({ children }) => children,
  useQuery: jest.fn(),
  useMutation: jest.fn(),
};
