import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-orange-50">
      {/* 공통 헤더 */}

      {/* 페이지 콘텐츠 */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
