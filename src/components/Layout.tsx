import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
