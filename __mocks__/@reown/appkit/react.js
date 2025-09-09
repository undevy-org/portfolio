// __mocks__/@reown/appkit/react.js
module.exports = {
  useAppKit: jest.fn(() => ({
    open: jest.fn(),
  })),
  createAppKit: jest.fn(() => ({})),
};
