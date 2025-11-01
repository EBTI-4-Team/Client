import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-orange-50">
      {/* 공통 헤더 */}
      <header className="h-104px flex w-full items-center justify-between bg-yellow-400 px-5">
        {/* 로고/타이틀: 세로 중앙 정렬 */}
        <div className="flex h-20 w-44 items-center justify-center text-center font-['Inter'] text-4xl font-semibold text-white">
          EBTing
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
