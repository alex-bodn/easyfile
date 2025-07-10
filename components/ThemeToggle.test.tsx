import * as React from 'react';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from 'next-themes';

jest.mock('@/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseTheme = require('@/hooks/useTheme').default;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when not mounted', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      toggleTheme: jest.fn(),
    });

    const setMountedMock = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementationOnce(() => [false, setMountedMock]);

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toBeNull();

    useStateSpy.mockRestore();
  });
});
