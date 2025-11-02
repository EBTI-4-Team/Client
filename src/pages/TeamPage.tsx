import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import MemberCard from '../components/MemberCard';

// ✅ EBTI 이미지 매핑 (24유형)
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

  const [name, setName] = useState('');
  const [ebti, setEbti] = useState('');
  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  // ✅ 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId || !token) return;
      try {
        const res = await axiosInstance.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setName(data.name || '');
        setEbti(data.ebti || '');
      } catch (e) {
        console.error('❌ 사용자 정보 로드 실패:', e);
      }
    };
    fetchUserInfo();
  }, [userId, token]);

  const avatarSrc = useMemo(() => {
    return EBTI_IMAGES[ebti] || 'https://placehold.co/100x100?text=EBTI';
  }, [ebti]);

  // ✅ 팀 상세정보
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
      <div className="flex h-screen items-center justify-center bg-[#FFF8EF] text-gray-600">
        팀 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#FFF8EF]">
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

  const handleCreateOrViewReport = () => {
    if (!teamId) return;
    if (hasReport && reportId) {
      navigate(`/feedback?teamId=${teamId}&reportId=${reportId}`);
    } else {
      navigate('/loading', { state: { teamId } });
    }
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
        {/* ✅ 사이드바 */}
        <aside className="fixed top-[80px] left-0 hidden h-[calc(100vh-80px)] w-64 border-r border-neutral-200 bg-white shadow-sm sm:block">
          <div className="flex h-full flex-col items-center gap-8 px-6 pt-10 pb-10">
            <div className="grid h-[112px] w-[112px] place-items-center overflow-hidden rounded-full bg-[#FFF8EF]">
              <img
                src={avatarSrc}
                alt={ebti || 'EBTI'}
                className="h-[100px] w-[100px] object-contain"
                onError={(e) =>
                  (e.currentTarget.src = 'https://placehold.co/100x100')
                }
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
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-yellow-400"
                  >
                    팀 목록
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/mypage')}
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-yellow-400"
                  >
                    마이페이지
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate('/login');
                    }}
                    className="w-full rounded-full px-5 py-2.5 text-left text-sm font-medium text-neutral-700 hover:bg-yellow-400"
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* ✅ 메인 콘텐츠 */}
        <main className="ml-[288px] flex-1 px-10 py-10">
          <section className="mx-auto max-w-[900px] rounded-[16px] border-2 border-yellow-300 bg-white shadow-[0_6px_0_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center gap-8 p-8 text-center">
              {/* 팀 기본 정보 */}
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {team.teamName}
                </h3>
                <p className="max-w-[700px] text-base text-gray-700">
                  {team.teamExplain || '팀에 대한 설명이 없습니다.'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  인원: {team.members.length}/{team.maxMember}
                </p>
              </div>

              {/* 멤버 목록 */}
              <div className="w-full">
                <h4 className="mb-4 text-center text-lg font-semibold text-gray-800">
                  팀원 목록
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {team.members.map((m) => (
                    <MemberCard
                      key={m.userId}
                      name={m.userName}
                      ebti={m.ebti}
                    />
                  ))}
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="mt-8 flex justify-center gap-6">
                <button
                  onClick={() => navigate('/teamlistpage')}
                  className="rounded-lg bg-yellow-400 px-6 py-2 text-base font-semibold text-white hover:bg-yellow-500"
                >
                  뒤로가기
                </button>

                <button
                  onClick={handleCreateOrViewReport}
                  className="rounded-lg bg-yellow-400 px-6 py-2 text-base font-semibold text-white hover:bg-yellow-500"
                >
                  {hasReport ? '리포트 보기' : '리포트 생성하기'}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
