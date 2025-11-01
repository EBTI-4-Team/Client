import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTeamStore } from '../stores/teamStore';
import MemberCard from '../components/MemberCard';

type Member = { name: string; ebti: string };
type LocationState = { teamId?: string };

export default function TeamPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: LocationState };
  const teamId = state?.teamId;

  const getTeamById = useTeamStore((s) => s.getTeamById);
  const team = teamId ? getTeamById(teamId) : null;

  // TODO: 추후에는 zustand나 백엔드에서 가져오도록 변경
  const members: Member[] = [
    { name: '승준', ebti: 'ICDE' },
    { name: '민수', ebti: 'IDEC' },
    { name: '하린', ebti: 'IEDC' },
    { name: '유나', ebti: 'EDIC' },
  ];

  if (!team) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-orange-50">
        <div className="rounded-2xl bg-white p-8 text-red-600 shadow">
          팀 정보를 찾을 수 없습니다.
        </div>
        <button
          onClick={() => navigate('/teamlistpage')}
          className="mt-6 rounded-lg bg-yellow-400 px-5 py-2 text-white hover:bg-yellow-500"
        >
          팀 목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex min-h-[982px] w-[1512px] flex-col items-center justify-start gap-10 bg-orange-50">
      <div className="flex w-[1262px] flex-col items-start justify-start gap-11">
        {/* 상단: 방명 / 인원 */}
        <div className="mt-5 inline-flex items-center justify-center gap-12 self-stretch">
          <div className="flex h-8 w-52 items-center justify-start gap-5 rounded-[30px] bg-orange-50 pr-2.5 shadow">
            <div className="flex w-24 flex-col items-start justify-start">
              <div className="flex h-8 w-full items-center justify-center rounded-l-[30px] bg-yellow-400 py-2">
                <span className="text-center font-['Inter'] text-lg leading-[48px] font-normal text-black">
                  방명
                </span>
              </div>
            </div>
            <span className="w-20 font-['Inter'] text-base leading-[48px] font-normal text-black">
              {team.name}
            </span>
          </div>

          <div className="flex h-8 w-52 items-center justify-start gap-5 rounded-[30px] bg-orange-50 pr-2.5 shadow">
            <div className="flex w-24 flex-col items-start justify-start">
              <div className="flex h-8 w-full items-center justify-center rounded-l-[30px] bg-yellow-400 py-2">
                <span className="text-center font-['Inter'] text-lg leading-[48px] font-normal text-black">
                  방인원수
                </span>
              </div>
            </div>
            <span className="w-20 font-['Inter'] text-base leading-[48px] font-normal text-black">
              {team.current}/{team.max}
            </span>
          </div>
        </div>

        {/* 설명 + 멤버 카드 */}
        <div className="flex flex-col items-center justify-start gap-7 self-stretch">
          {/* 설명 카드 */}
          <div className="flex flex-col items-center justify-start gap-10">
            <div className="flex h-72 w-[1226px] flex-col items-start justify-start gap-12 rounded-[20px] bg-white p-10 shadow">
              <p className="font-['Pretendard_Variable'] text-3xl leading-9 font-medium text-black">
                {team.message || '팀에 대한 소개가 아직 없습니다.'}
              </p>
            </div>

            {/* 가로 스크롤 멤버 영역 */}
            <div className="flex w-[1226px] flex-col items-end justify-end gap-16">
              <div
                className="w-full overflow-x-auto pb-4"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="flex gap-7 [&::-webkit-scrollbar]:hidden">
                  {members.map((m, idx) => (
                    <MemberCard
                      key={`${m.name}-${idx}`}
                      name={m.name}
                      ebti={m.ebti}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="flex w-80 flex-col items-start justify-start gap-2.5 p-2.5">
              <button
                onClick={() => navigate('/teamlistpage')}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500"
              >
                <span className="font-['Pretendard_Variable'] text-2xl leading-8 font-medium text-white">
                  뒤로가기
                </span>
              </button>
            </div>
            <div className="flex w-80 flex-col items-start justify-start gap-2.5 p-2.5">
              <button
                onClick={() => navigate('/team/confirm')}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500"
              >
                <span className="font-['Pretendard_Variable'] text-2xl leading-8 font-medium text-white">
                  팀 확정하기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
