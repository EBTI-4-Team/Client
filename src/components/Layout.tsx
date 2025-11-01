import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  const isFullPage = ['/Login', '/Register'].includes(location.pathname);

  if (isFullPage) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
