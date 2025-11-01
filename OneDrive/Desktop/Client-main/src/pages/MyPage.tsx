import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function MyPage() {
  const navigate = useNavigate();

  const [userName] = useState('이승준');
  const [nickname] = useState('승준띠니');
  const [phone] = useState('010-1234-5678');

  const handleEditTeam = () => navigate('/team/edit');
  const handleViewTypeResult = () => navigate('/result/my-type');
  const handleGoHome = () => navigate('/home');
  const handleOpenSettings = () => navigate('/settings');

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF]">
      {/* 헤더 */}
      <header className="h-[104px] flex w-full items-center justify-between bg-yellow-400 px-5 shadow">
        <div
          onClick={() => navigate('/')}
          className="flex h-20 w-44 cursor-pointer items-center justify-center text-center font-['Inter'] text-4xl font-semibold text-white"
        >
          EBTing
        </div>
        <div className="flex items-center gap-4 text-3xl text-white">
          
        </div>
      </header>

      <div className="flex w-full">
        {/* 사이드바 */}
        <aside className="fixed left-0 top-[104px] hidden h-[calc(100vh-104px)] w-64 border-r border-neutral-200 bg-white shadow-sm sm:block">
          <div className="flex h-full flex-col items-center px-6 pt-8">
            <div className="grid h-[96px] w-[96px] place-items-center rounded-full bg-[#FFF8EF]">
              <span className="text-4xl">🦉</span>
            </div>
            <div className="mt-4 text-base font-semibold text-neutral-800">
              {userName}
            </div>

            <nav className="mt-8 w-full">
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    onClick={handleGoHome}
                    className="w-full rounded-full px-5 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    메인화면
                  </button>
                </li>
                <li>
                  <button
                    className="w-full rounded-full bg-yellow-400 px-5 py-2 text-left text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]"
                    aria-current="page"
                  >
                    My 정보
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenSettings}
                    className="w-full rounded-full px-5 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    설정
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="ml-[288px] flex-1 px-8 py-10">
          {/* ✅ 제목 바로 컴포넌트 위에 붙이기 */}
          <div className="mb-2 text-justify-center font-bold text-neutral-900">My 정보</div>

          {/* ✅ 카드 컴포넌트 */}
          <section className="mx-auto max-w-[800px] rounded-[16px] border-2 border-yellow-300 bg-white p-16 shadow-[0_6px_0_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[200px_1fr]">
              <div className="flex items-center justify-center">
                <div className="grid h-[120px] w-[120px] place-items-center rounded-2xl bg-[#FFF8EF]">
                  <span className="text-7xl">🦉</span>
                </div>
              </div>

              <div>
                <dl className="grid grid-cols-[100px_1fr] items-center gap-y-6">
                  <dt className="text-sm font-semibold text-neutral-600">닉네임</dt>
                  <dd className="text-base font-medium text-neutral-900">{nickname}</dd>
                  <dt className="text-sm font-semibold text-neutral-600">전화번호</dt>
                  <dd className="text-base font-medium text-neutral-900">{phone}</dd>
                </dl>
              </div>
            </div>

            <div className="my-10 h-px w-full bg-yellow-200" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-10">
                <div className="text-base font-semibold text-neutral-800">팀 수정</div>
                <Button
                  variant="primary"
                  width="200px"
                  height="44px"
                  fontSize="14px"
                  onClick={handleEditTeam}
                >
                  팀 수정하기
                </Button>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-10">
                <div className="text-base font-semibold text-neutral-800">팀 결과</div>
                <Button
                  variant="primary"
                  width="220px"
                  height="44px"
                  fontSize="14px"
                  onClick={handleViewTypeResult}
                >
                  내 유형 결과 보기
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
