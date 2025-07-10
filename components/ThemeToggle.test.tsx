import * as React from 'react';
import { render } from '@testing-library/react';

import ThemeToggle from './ThemeToggle';

jest.mock('@/hooks/useTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import mockUseTheme from '@/hooks/useTheme';

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
    (mockUseTheme as jest.Mock).mockReturnValue({
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
