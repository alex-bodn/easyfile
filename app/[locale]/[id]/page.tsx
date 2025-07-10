"use client"

import Logo from "../../../components/Logo";
import FileDownload from "../../../components/FileDownload";
import { useParams } from "next/navigation";

import Navbar from "@/components/ui/Navbar";

import { useTranslations } from 'next-intl';

export default function Donwload() {
  const { id } = useParams();

  const t = useTranslations('Page');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <header className="flex flex-col items-center">
        <Logo />
        <h3 className="max-w-xl p-10 text-sm text-gray-500 select-none">{t('title')}</h3>
      </header>
      <FileDownload fileId={id?.toString()} />
    </main>
  );
}

