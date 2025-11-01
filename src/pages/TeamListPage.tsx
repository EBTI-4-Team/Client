import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeamStore } from '../stores/teamStore';
import { useTeamModalStore } from '../stores/teamModalStore';
import TeamRow from '../components/team/TeamRow';
import TeamAddModal from '../components/team/TeamAddModal';

export default function TeamListPage() {
  const navigate = useNavigate();

  const teams = useTeamStore((s) => s.teams);
  const enterTeamOnce = useTeamStore((s) => s.enterTeamOnce); // ✅ 바뀐 부분

  const openModal = useTeamModalStore((s) => s.open);
  const resetModal = useTeamModalStore((s) => s.resetFields);

  const handleAdd = () => {
    resetModal(); // 열기 전 필드 초기화
    openModal();
  };

  const handleEnter = (id: string) => {
    const team = teams.find((t) => t.id === id);
    if (!team) {
      alert('해당 팀을 찾을 수 없습니다.');
      return;
    }

    if (team.current >= team.max) {
      alert('정원이 가득 찼습니다.');
      return;
    }

    // ✅ 같은 세션 사용자에 대해 중복 카운트 방지
    enterTeamOnce(id);

    // ✅ TeamPage로 이동 (정적 경로 사용)
    navigate('/teampage', {
      state: { teamId: id },
    });
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col overflow-hidden bg-orange-50">
      {/* 상단 바 */}
      <div className="mx-auto flex w-full max-w-[1512px] items-center justify-between px-5 pt-6 pb-4">
        {/* 왼쪽: 페이지 타이틀 */}
        <div className="h-14 text-center font-['Inter'] text-3xl leading-[48px] font-semibold text-black">
          팀 목록
        </div>

        {/* 오른쪽: 버튼들 */}
        <div className="flex items-center gap-4">
          {/* My Page 버튼 */}
          <button
            onClick={() => navigate('/mypage')}
            className="rounded-[20px] bg-yellow-100 px-5 py-2 text-lg font-medium text-black transition hover:bg-yellow-200"
          >
            마이페이지
          </button>

          {/* Add team 버튼 */}
          <button
            onClick={handleAdd}
            className="h-10 rounded-[20px] bg-yellow-400 px-4 text-lg text-white hover:bg-yellow-500"
          >
            팀 추가
          </button>
        </div>
      </div>

      {/* 리스트 스크롤 영역 */}
      <div className="mx-auto w-full max-w-[1512px] flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex w-full flex-col gap-5 rounded-[30px] bg-white px-7 py-10">
          {teams.map((t) => (
            <TeamRow
              key={t.id}
              id={t.id}
              name={t.name}
              message={t.message}
              current={t.current}
              max={t.max}
              onEnter={handleEnter} // ✅ 노란 버튼 클릭 → 입장 + 이동
            />
          ))}
          {teams.length === 0 && (
            <div className="py-16 text-center text-gray-500">
              아직 생성된 팀이 없습니다.{' '}
              <span className="font-medium">‘팀 추가’</span> 버튼으로 첫 팀을
              만들어보세요!
            </div>
          )}
        </div>
      </div>

      {/* 팀 추가 모달 */}
      <TeamAddModal />
    </div>
  );
}
