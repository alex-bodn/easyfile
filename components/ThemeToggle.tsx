'use client';

import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme, isMounted  } = useTheme();

  if (!isMounted || !theme) return null;

  return (
    <div
      className="mx-5 transition-opacity duration-500 ease-in-out text-4xl cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <FaSun data-testid="theme-icon-light" className="text-orange-500 animate-fade" />
      ) : (
        <FaMoon data-testid="theme-icon-dark" className="text-yellow-300 animate-fade" />
      )}
    </div>
  );
}