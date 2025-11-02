import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import TeamRow from '../components/team/TeamRow';
import TeamAddModal from '../components/team/TeamAddModal';
import { useTeamModalStore } from '../stores/teamModalStore';

// ✅ EBTI 이미지 매핑
import DICEImage from '../assets/images/DICE.png';
import DIECImage from '../assets/images/DIEC.png';
import DCIEImage from '../assets/images/DCIE.png';
import DCEIImage from '../assets/images/DCEI.png';
import DEICImage from '../assets/images/DEIC.png';
import DECIImage from '../assets/images/DECI.png';
import IDCEImage from '../assets/images/IDCE.png';
import IDECImage from '../assets/images/IDEC.png';
import ICDEImage from '../assets/images/ICDE.png';
import ICEDImage from '../assets/images/ICED.png';
import IEDCImage from '../assets/images/IEDC.png';
import IECDImage from '../assets/images/IECD.png';
import CDIEImage from '../assets/images/CDIE.png';
import CDEIImage from '../assets/images/CDEI.png';
import CIDEImage from '../assets/images/CIDE.png';
import CIEDImage from '../assets/images/CIED.png';
import CEDIImage from '../assets/images/CEDI.png';
import CEIDImage from '../assets/images/CEID.png';
import EDICImage from '../assets/images/EDIC.png';
import EDCIImage from '../assets/images/EDCI.png';
import ECDIImage from '../assets/images/ECDI.png';
import ECIDImage from '../assets/images/ECID.png';
import EIDCImage from '../assets/images/EIDC.png';
import EICDImage from '../assets/images/EICD.png';
import Logo from '../assets/images/Logo.png';

const EBTI_IMAGES: Record<string, string> = {
  DICE: DICEImage,
  DIEC: DIECImage,
  DCIE: DCIEImage,
  DCEI: DCEIImage,
  DEIC: DEICImage,
  DECI: DECIImage,
  IDCE: IDCEImage,
  IDEC: IDECImage,
  ICDE: ICDEImage,
  ICED: ICEDImage,
  IEDC: IEDCImage,
  IECD: IECDImage,
  CDIE: CDIEImage,
  CDEI: CDEIImage,
  CIDE: CIDEImage,
  CIED: CIEDImage,
  CEDI: CEDIImage,
  CEID: CEIDImage,
  EDIC: EDICImage,
  EDCI: EDCIImage,
  ECDI: ECDIImage,
  ECID: ECIDImage,
  EIDC: EIDCImage,
  EICD: EICDImage,
};

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
  const [name, setName] = useState('');
  const [ebti, setEbti] = useState('');
  const [avatarSrc, setAvatarSrc] = useState('https://placehold.co/100x100');

  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  const showMyTeamsOnly =
    (location.state as { showMyTeamsOnly?: boolean })?.showMyTeamsOnly || false;

  /** ✅ 사용자 정보 불러오기 (MyPage와 동일) */
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId || !token) return;

      try {
        const res = await axiosInstance.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setName(data.name || '사용자');
        setEbti(data.ebti || '');
        const img =
          EBTI_IMAGES[data.ebti] || 'https://placehold.co/100x100?text=EBTI';
        setAvatarSrc(img);
      } catch (err) {
        console.error('❌ 사용자 정보 로드 실패:', err);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  /** ✅ 팀 목록 불러오기 */
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

    if (isMember) navigate('/teampage', { state: { teamId } });
    else {
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

  /** ✅ 팀 삭제 / 나가기 */
  const handleDeleteTeam = async (teamId: number) => {
    if (!window.confirm('정말 이 팀을 삭제하시겠습니까?')) return;
    try {
      await axiosInstance.delete(`/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      alert('팀이 삭제되었습니다.');
      setTeamList((prev) => prev.filter((t) => t.teamId !== teamId));
    } catch {
      alert('팀 삭제 중 오류가 발생했습니다. 관리자만 삭제 가능합니다.');
    }
  };

  const handleLeaveTeam = async (teamId: number) => {
    if (!window.confirm('정말 이 팀에서 나가시겠습니까?')) return;
    try {
      await axiosInstance.delete(`/api/teams/${teamId}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      alert('팀에서 나왔습니다.');
      setTeamList((prev) => prev.filter((t) => t.teamId !== teamId));
    } catch {
      alert('팀 나가기 중 오류가 발생했습니다.');
    }
  };

  const getMyRole = (team: TeamItem): 'ADMIN' | 'MEMBER' | null => {
    const me = team.members.find((m) => m.userId === userId);
    return me ? me.role : null;
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* ✅ 상단 고정 헤더 */}
      <header className="fixed top-0 left-0 z-20 flex h-[80px] w-full items-center border-b border-gray-200 bg-white px-8 shadow-sm">
        <img
          src={Logo}
          alt="로고"
          className="h-[135px] cursor-pointer object-contain"
          onClick={() => navigate('/')}
        />
      </header>

      <div className="flex pt-[80px]">
        {' '}
        {/* ✅ 헤더 높이만큼 아래로 내림 */}
        {/* ✅ 사이드바 (MyPage 스타일 적용) */}
        <aside className="fixed top-[80px] left-0 hidden h-[calc(100vh-80px)] w-64 border-r border-neutral-200 bg-white shadow-sm sm:block">
          <div className="flex h-full flex-col items-center gap-8 px-6 pt-10 pb-10">
            <div className="grid h-[112px] w-[112px] place-items-center overflow-hidden rounded-full bg-[#FFF8EF]">
              <img
                src={avatarSrc}
                alt={ebti || 'EBTI'}
                className="h-[100px] w-[100px] object-contain"
              />
            </div>

            <div className="text-center text-lg font-semibold text-neutral-800">
              {name}
            </div>

            <nav className="mt-2 w-full">
              <ul className="flex flex-col gap-4">
                <li>
                  <button
                    onClick={() => navigate('/teamlistpage')}
                    className={`w-full rounded-full px-5 py-2.5 text-left text-sm font-medium ${
                      !showMyTeamsOnly
                        ? 'bg-yellow-400 text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    전체 팀 보기
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigate('/teamlistpage', {
                        state: { showMyTeamsOnly: true },
                      })
                    }
                    className={`w-full rounded-full px-5 py-2.5 text-left text-sm font-medium ${
                      showMyTeamsOnly
                        ? 'bg-yellow-400 text-white shadow-[0_2px_0_rgba(0,0,0,0.06)]'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    내 팀 보기
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/mypage')}
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    마이페이지
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        {/* ✅ 메인 */}
        <main className="ml-[288px] flex-1 px-8 py-6">
          {/* 팀 추가 버튼 — 오른쪽 정렬 및 간격 추가 */}
          {!showMyTeamsOnly && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => {
                  resetFields();
                  open();
                }}
                className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-yellow-500"
              >
                팀 추가
              </button>
            </div>
          )}

          {loading ? (
            <div className="mt-10 text-center text-sm text-gray-500">
              팀 목록을 불러오는 중...
            </div>
          ) : teamList.length > 0 ? (
            <div className="space-y-4">
              {teamList.map((team) => {
                const isMember = team.members?.some((m) => m.userId === userId);
                const myRole = getMyRole(team);
                const currentMember = team.members?.length || 0;

                return (
                  <div
                    key={team.teamId}
                    className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
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
                          : `참가 (${currentMember}/${team.maxMember})`
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
                        className={`ml-3 rounded-md px-2.5 py-1 text-[10px] font-medium text-white ${
                          myRole === 'ADMIN'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-gray-500 hover:bg-gray-600'
                        }`}
                      >
                        {myRole === 'ADMIN' ? '삭제' : '탈퇴'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 text-center text-sm text-gray-500">
              {showMyTeamsOnly
                ? '소속된 팀이 없습니다.'
                : '생성된 팀이 없습니다. ‘팀 추가’ 버튼으로 시작하세요!'}
            </div>
          )}
        </main>
      </div>

      <TeamAddModal />
    </div>
  );
}
