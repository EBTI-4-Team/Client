import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import TeamRow from '../components/team/TeamRow';
import TeamAddModal from '../components/team/TeamAddModal';
import { useTeamModalStore } from '../stores/teamModalStore';

type Member = {
  userId: number;
  userName: string;
  ebti: string;
};

type TeamItem = {
  teamId: number;
  teamName: string;
  teamExplain: string;
  maxMember: number;
  members: Member[];
};

export default function TeamListPage() {
  const navigate = useNavigate();
  const { open, resetFields } = useTeamModalStore();
  const [teamList, setTeamList] = useState<TeamItem[]>([]);
  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  // ✅ 팀 목록 조회
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axiosInstance.get('/api/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamList(res.data.data);
      } catch (error) {
        console.error('❌ 팀 목록 불러오기 실패:', error);
      }
    };
    fetchTeams();
  }, [token]);

  // ✅ 팀 참가 or 보기 버튼 클릭
  const handleJoinOrEnter = async (team: TeamItem) => {
    const isMember = team.members?.some((m) => m.userId === userId);
    const teamId = team.teamId;

    if (isMember) {
      // 이미 가입된 팀 → 바로 입장
      navigate('/teampage', { state: { teamId } });
    } else {
      // 가입 요청
      if (!userId || !token) {
        alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }

      try {
        await axiosInstance.post(`/api/teams/${teamId}/users`, null, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        });

        alert('팀에 참가되었습니다!');
        navigate('/teampage', { state: { teamId } });
      } catch (error) {
        console.error('❌ 팀 참가 실패:', error);
        alert('이미 가입된 팀이거나 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col overflow-hidden bg-orange-50">
      {/* 상단 바 */}
      <div className="mx-auto flex w-full max-w-[1512px] items-center justify-between px-5 pt-6 pb-4">
        <div className="text-3xl font-semibold text-black">팀 목록</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/mypage')}
            className="rounded-[20px] bg-yellow-100 px-5 py-2 text-lg font-medium text-black transition hover:bg-yellow-200"
          >
            마이페이지
          </button>
          <button
            onClick={() => {
              resetFields();
              open();
            }}
            className="h-10 rounded-[20px] bg-yellow-400 px-4 text-lg text-white hover:bg-yellow-500"
          >
            팀 추가
          </button>
        </div>
      </div>

      {/* 팀 리스트 */}
      <div className="mx-auto w-full max-w-[1512px] flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex w-full flex-col gap-5 rounded-[30px] bg-white px-7 py-10">
          {teamList.length > 0 ? (
            teamList.map((t) => {
              const currentMember = t.members?.length || 0;
              const isMember = t.members?.some((m) => m.userId === userId);

              return (
                <TeamRow
                  key={t.teamId}
                  id={String(t.teamId)}
                  name={t.teamName}
                  message={t.teamExplain}
                  current={currentMember}
                  max={t.maxMember}
                  buttonLabel={
                    isMember
                      ? `팀 보기 (${currentMember}/${t.maxMember})`
                      : `방 참가 (${currentMember}/${t.maxMember})`
                  }
                  onEnter={() => handleJoinOrEnter(t)}
                />
              );
            })
          ) : (
            <div className="py-16 text-center text-gray-500">
              아직 생성된 팀이 없습니다.{' '}
              <span className="font-medium">‘팀 추가’</span> 버튼으로 첫 팀을
              만들어보세요!
            </div>
          )}
        </div>
      </div>

      <TeamAddModal />
    </div>
  );
}
