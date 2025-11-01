import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const EBTI_AVATARS: Record<string, { alt: string; src: string }> = {
  CREATOR: { alt: '창조자형', src: '/assets/ebti/creator.png' },
  EXPLORER: { alt: '탐색자형', src: '/assets/ebti/explorer.png' },
  EXECUTOR: { alt: '실행가형', src: '/assets/ebti/executor.png' },
  COLLABORATOR: { alt: '협업가형', src: '/assets/ebti/collaborator.png' },
};

export default function MyPage() {
  const navigate = useNavigate();

  // 설문 결과로 확정된 유형(표시만)
  const [ebtiType] = useState<keyof typeof EBTI_AVATARS | ''>('');

  // 사용자 정보 (닉네임 양쪽에서 공유)
  const [userName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 7);
    const p3 = digits.slice(7, 11);
    setPhone([p1, p2, p3].filter(Boolean).join('-'));
  };

  const avatar = useMemo(() => {
    const conf = ebtiType ? EBTI_AVATARS[ebtiType] : undefined;
    return conf ?? { alt: '부엉이', src: '' };
  }, [ebtiType]);

  // ✅ App.tsx 라우트에 맞춘 경로
  const handleGoHome = () => navigate('/teamlist');
  const goMyType = () => navigate('/resultpage');
  const goTeamFeedback = () => navigate('/feedback');

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF]">
      {/* 헤더 */}
      <header className="flex h-[104px] w-full items-center justify-between bg-yellow-400 px-5 shadow">
        <div
          onClick={() => navigate('/teamlist')}
          className="flex h-20 w-44 cursor-pointer items-center justify-center text-center font-['Inter'] text-4xl font-semibold text-white"
        >
          EBTing
        </div>
      </header>

      <div className="flex w-full">
        {/* 사이드바 */}
        <aside className="top:[104px] fixed left-0 hidden h-[calc(100vh-104px)] w-64 border-r border-neutral-200 bg-white shadow-sm sm:block">
          <div className="flex h-full flex-col items-center gap-8 px-6 pt-16 pb-10">
            <div className="grid h-[112px] w-[112px] place-items-center overflow-hidden rounded-full bg-[#FFF8EF]">
              {avatar.src ? (
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="h-[100px] w-[100px] object-contain"
                />
              ) : (
                <span className="text-5xl">🦉</span>
              )}
            </div>

            {/* 닉네임: 사이드바에서도 입력 가능 (메인과 동기화) */}
            <div className="w-full">
              <label className="mb-1 block text-xs font-semibold text-neutral-600">
                닉네임
              </label>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={`${userName}`}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <nav className="mt-2 w-full">
              <ul className="flex flex-col gap-4">
                <li>
                  <button
                    onClick={handleGoHome}
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    메인화면
                  </button>
                </li>
                <li>
                  <button
                    className="w-full rounded-full bg-yellow-400 px-5 py-2.5 text-left text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]"
                    aria-current="page"
                  >
                    My 정보
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    설정
                  </button>
                </li>
              </ul>
            </nav>

            <div className="flex-1" />
          </div>
        </aside>

        {/* 메인 */}
        <main className="ml-[288px] flex-1 px-8 py-10">
          <section className="mx-auto max-w-[880px] rounded-[16px] border-2 border-yellow-300 bg-white p-0 shadow-[0_6px_0_rgba(0,0,0,0.08)]">
            <div className="rounded-t-[14px] bg-[#FFF8EF] px-6 py-4">
              <h2 className="text-lg font-bold text-neutral-900">My 정보</h2>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[200px_1fr]">
                {/* 아바타 */}
                <div className="flex items-start justify-center">
                  <div className="grid h-[140px] w-[140px] place-items-center overflow-hidden rounded-2xl bg-[#FFF8EF]">
                    {avatar.src ? (
                      <img
                        src={avatar.src}
                        alt={avatar.alt}
                        className="h-[120px] w-[120px] object-contain"
                      />
                    ) : (
                      <span className="text-7xl">🦉</span>
                    )}
                  </div>
                </div>

                {/* 닉네임 + 전화번호 */}
                <div className="w-full">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-[100px_1fr]">
                    <dt className="pt-2 text-sm font-semibold text-neutral-600 md:text-right">
                      닉네임
                    </dt>
                    <dd>
                      <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base text-neutral-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                      />
                    </dd>

                    <dt className="pt-2 text-sm font-semibold text-neutral-600 md:text-right">
                      전화번호
                    </dt>
                    <dd>
                      <input
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        inputMode="numeric"
                        placeholder="010-0000-0000"
                        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-base text-neutral-900 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                      />
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="my-10 h-px w-full bg-yellow-200" />

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-8">
                  <div className="text-base font-semibold text-neutral-800">
                    내 EBTI 보기
                  </div>
                  <Button
                    variant="primary"
                    width="220px"
                    height="44px"
                    fontSize="14px"
                    onClick={goMyType} // /resultpage
                  >
                    내 EBTI 보기
                  </Button>
                </div>

                <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-8">
                  <div className="text-base font-semibold text-neutral-800">
                    팀 피드백
                  </div>
                  <Button
                    variant="primary"
                    width="220px"
                    height="44px"
                    fontSize="14px"
                    onClick={goTeamFeedback} // /feedback
                  >
                    팀 피드백 보기
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
