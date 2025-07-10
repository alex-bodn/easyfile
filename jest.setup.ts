import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(), // старе API
    addEventListener: jest.fn(), // нове API
    removeEventListener: jest.fn(), // нове API
    dispatchEvent: jest.fn(),
  }),
});