import Logo from "./components/Logo";
import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <header className="flex flex-col items-center">
        <Logo />
        <h3 className="max-w-xl p-10 text-sm text-gray-500 select-none">This site is intended solely for sharing personal files. Users are responsible for the content they upload, and illegal or copyrighted materials are strictly prohibited. Use this platform only for lawful and personal purposes.</h3>
      </header>
      <FileUpload />
    </main>
  );
}
