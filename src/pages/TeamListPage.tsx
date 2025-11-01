import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import TeamRow from '../components/team/TeamRow';
import TeamAddModal from '../components/team/TeamAddModal';
import { useTeamModalStore } from '../stores/teamModalStore';

type Member = {
  userId: number;
  userName: string;
  ebti: string;
  role: 'ADMIN' | 'MEMBER';
};

type TeamItem = {
  teamId: number;
  teamName: string;
  teamExplain: string;
  maxMember: number;
  reportId?: number;
  members: Member[];
};

export default function TeamListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { open, resetFields } = useTeamModalStore();

  const [teamList, setTeamList] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(false);

  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  const showMyTeamsOnly =
    (location.state as { showMyTeamsOnly?: boolean })?.showMyTeamsOnly || false;

  /** ✅ 팀 목록 조회 */
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/teams', {
        headers: { Authorization: `Bearer ${token}` },
      });

      let teams: TeamItem[] = res.data.data || [];

      if (showMyTeamsOnly) {
        teams = teams.filter((t) =>
          t.members?.some((m) => m.userId === userId)
        );
      }

      setTeamList(teams);
    } catch (error) {
      console.error('❌ 팀 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [token, userId, showMyTeamsOnly]);

  /** ✅ 팀 입장 / 참가 */
  const handleJoinOrEnter = async (team: TeamItem) => {
    const isMember = team.members?.some((m) => m.userId === userId);
    const teamId = team.teamId;

    if (isMember) {
      navigate('/teampage', { state: { teamId } });
    } else {
      try {
        await axiosInstance.post(`/api/teams/${teamId}/users`, null, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        });
        alert('팀에 참가되었습니다!');
        await fetchTeams();
      } catch (error: any) {
        console.error('❌ 팀 참가 실패:', error);
        alert(
          error?.response?.data?.message ||
            '이미 가입된 팀이거나 오류가 발생했습니다.'
        );
      }
    }
  };

  /** ✅ 팀 삭제 (ADMIN) */
  /** ✅ 팀 삭제 (ADMIN) */
  const handleDeleteTeam = async (teamId: number) => {
    if (!window.confirm('정말 이 팀을 삭제하시겠습니까?')) return;
    try {
      const res = await axiosInstance.delete(`/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId }, // ✅ userId 함께 전달
      });

      if (res.status === 200) {
        alert('팀이 삭제되었습니다.');
        setTeamList((prev) => prev.filter((t) => t.teamId !== teamId));
      }
    } catch (error: any) {
      console.error('❌ 팀 삭제 실패:', error);
      alert(
        error?.response?.data?.message ||
          '팀 삭제 중 오류가 발생했습니다. 관리자만 삭제 가능합니다.'
      );
    }
  };

  /** ✅ 팀 나가기 (MEMBER) */
  const handleLeaveTeam = async (teamId: number) => {
    if (!window.confirm('정말 이 팀에서 나가시겠습니까?')) return;
    try {
      const res = await axiosInstance.delete(`/api/teams/${teamId}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      if (res.status === 200) {
        alert('팀에서 나왔습니다.');
        setTeamList((prev) => prev.filter((t) => t.teamId !== teamId));
      }
    } catch (error) {
      console.error('❌ 팀 나가기 실패:', error);
      alert('팀 나가기 중 오류가 발생했습니다.');
    }
  };

  /** ✅ 내 역할 확인 */
  const getMyRole = (team: TeamItem): 'ADMIN' | 'MEMBER' | null => {
    const me = team.members.find((m) => m.userId === userId);
    return me ? me.role : null;
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col overflow-hidden bg-orange-50">
      {/* 상단 바 */}
      <div className="mx-auto flex w-full max-w-[1512px] items-center justify-between px-5 pt-6 pb-4">
        <div className="text-3xl font-semibold text-black">
          {showMyTeamsOnly ? '내 팀 목록' : '팀 목록'}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/mypage')}
            className="rounded-[20px] bg-yellow-100 px-5 py-2 text-lg font-medium text-black transition hover:bg-yellow-200"
          >
            마이페이지
          </button>

          {!showMyTeamsOnly && (
            <button
              onClick={() => {
                resetFields();
                open();
              }}
              className="h-10 rounded-[20px] bg-yellow-400 px-4 text-lg text-white hover:bg-yellow-500"
            >
              팀 추가
            </button>
          )}
        </div>
      </div>

      {/* 팀 리스트 */}
      <div className="mx-auto w-full max-w-[1512px] flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex w-full flex-col gap-5 rounded-[30px] bg-white px-7 py-10">
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              불러오는 중...
            </div>
          ) : teamList.length > 0 ? (
            teamList.map((team) => {
              const currentMember = team.members?.length || 0;
              const isMember = team.members?.some((m) => m.userId === userId);
              const myRole = getMyRole(team);

              return (
                <div
                  key={team.teamId}
                  className="flex items-center justify-between"
                >
                  <TeamRow
                    id={String(team.teamId)}
                    name={team.teamName}
                    message={team.teamExplain}
                    current={currentMember}
                    max={team.maxMember}
                    buttonLabel={
                      isMember
                        ? `팀 보기 (${currentMember}/${team.maxMember})`
                        : `방 참가 (${currentMember}/${team.maxMember})`
                    }
                    onEnter={() => handleJoinOrEnter(team)}
                  />

                  {showMyTeamsOnly && isMember && (
                    <button
                      onClick={() =>
                        myRole === 'ADMIN'
                          ? handleDeleteTeam(team.teamId)
                          : handleLeaveTeam(team.teamId)
                      }
                      className={`ml-4 rounded-[12px] px-5 py-2 text-sm font-medium text-white ${
                        myRole === 'ADMIN'
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-gray-500 hover:bg-gray-600'
                      }`}
                    >
                      {myRole === 'ADMIN' ? '팀 삭제' : '팀 나가기'}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-gray-500">
              {showMyTeamsOnly
                ? '소속된 팀이 없습니다.'
                : '아직 생성된 팀이 없습니다. ‘팀 추가’ 버튼으로 첫 팀을 만들어보세요!'}
            </div>
          )}
        </div>
      </div>

      <TeamAddModal />
    </div>
  );
}
