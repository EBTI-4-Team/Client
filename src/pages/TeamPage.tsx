// ✅ src/pages/TeamPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import MemberCard from '../components/MemberCard';

type LocationState = { teamId?: number };

type Member = {
  userId: number;
  userName: string;
  ebti: string;
};

type TeamDetail = {
  teamId: number;
  teamName: string;
  teamExplain: string;
  maxMember: number;
  members: Member[];
  reportId?: number;
};

export default function TeamPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: LocationState };
  const teamId = state?.teamId;

  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasReport, setHasReport] = useState(false);
  const [reportId, setReportId] = useState<number | null>(null);

  useEffect(() => {
    if (!teamId) return;
    const fetchTeamDetail = async () => {
      try {
        const res = await axiosInstance.get(`/api/teams/${teamId}`);
        const teamData = res.data?.data;
        setTeam(teamData);

        const existingReportId = teamData?.reportId;
        if (existingReportId && existingReportId > 0) {
          setReportId(existingReportId);
          setHasReport(true);
        }
      } catch (err) {
        console.error('❌ 팀 상세 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetail();
  }, [teamId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-orange-50">
        <div className="text-lg text-gray-600">팀 정보를 불러오는 중...</div>
      </div>
    );
  }

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

  // ✅ 버튼 클릭 시 로딩 페이지로 이동
  const handleCreateOrViewReport = () => {
    if (!teamId) return;
    if (hasReport && reportId) {
      navigate(`/feedback?teamId=${teamId}&reportId=${reportId}`);
    } else {
      navigate('/loading', { state: { teamId } }); // ✅ 로딩 페이지로 이동
    }
  };

  return (
    <div className="inline-flex min-h-[982px] w-[1512px] flex-col items-center justify-start gap-10 bg-orange-50">
      <div className="flex w-[1262px] flex-col items-start justify-start gap-11">
        {/* 상단: 팀명 / 인원 */}
        <div className="mt-5 inline-flex items-center justify-center gap-12 self-stretch">
          <div className="flex h-8 w-52 items-center justify-start gap-5 rounded-[30px] bg-orange-50 pr-2.5 shadow">
            <div className="flex w-24 items-center justify-center rounded-l-[30px] bg-yellow-400 py-2">
              <span className="text-center text-lg text-black">방명</span>
            </div>
            <span className="w-20 text-base text-black">{team.teamName}</span>
          </div>
          <div className="flex h-8 w-52 items-center justify-start gap-5 rounded-[30px] bg-orange-50 pr-2.5 shadow">
            <div className="flex w-24 items-center justify-center rounded-l-[30px] bg-yellow-400 py-2">
              <span className="text-center text-lg text-black">방인원수</span>
            </div>
            <span className="w-20 text-base text-black">
              {team.members.length}/{team.maxMember}
            </span>
          </div>
        </div>

        {/* 설명 */}
        <div className="flex flex-col items-center justify-start gap-7 self-stretch">
          <div className="flex flex-col items-center justify-start gap-10">
            <div className="flex h-72 w-[1226px] flex-col items-start justify-start gap-12 rounded-[20px] bg-white p-10 shadow">
              <p className="text-3xl font-medium text-black">
                {team.teamExplain || '팀에 대한 소개가 아직 없습니다.'}
              </p>
            </div>

            {/* 멤버 카드 */}
            <div className="flex w-[1226px] flex-col items-end justify-end gap-16">
              <div
                className="w-full overflow-x-auto pb-4"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="flex gap-7 [&::-webkit-scrollbar]:hidden">
                  {team.members.map((m) => (
                    <MemberCard
                      key={m.userId}
                      name={m.userName}
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
                <span className="text-2xl font-medium text-white">
                  뒤로가기
                </span>
              </button>
            </div>

            <div className="flex w-80 flex-col items-start justify-start gap-2.5 p-2.5">
              <button
                onClick={handleCreateOrViewReport}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500"
              >
                <span className="text-2xl font-medium text-white">
                  {hasReport ? '리포트 보기' : '리포트 생성하기'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
