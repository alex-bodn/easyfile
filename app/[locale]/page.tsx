import Logo from '../../components/Logo';
import FileUpload from '../../components/FileUpload';

import Navbar from '@/components/ui/Navbar';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Page');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <header className="flex flex-col items-center">
        <Logo />
        <h3 className="max-w-xl p-10 text-sm text-gray-500 dark:text-gray-300 select-none">
          {t('title')}
        </h3>
      </header>
      <FileUpload />
    </main>
  );
}
