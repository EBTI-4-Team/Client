import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import Button from '../components/Button';

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

export default function MyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ebti, setEbti] = useState('');
  const [teams, setTeams] = useState<
    { teamId: number; teamName: string; role: string }[]
  >([]);

  const userId = Number(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  // ✅ 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId || !token) {
        alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }

      try {
        const res = await axiosInstance.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;
        setName(data.name || '');
        setPhone(data.phoneNumber || '');
        setEbti(data.ebti || '');
        setTeams(data.teams || []);
      } catch (error) {
        console.error('❌ 사용자 정보 불러오기 실패:', error);
        alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId, token, navigate]);

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 7);
    const p3 = digits.slice(7, 11);
    setPhone([p1, p2, p3].filter(Boolean).join('-'));
  };

  const avatarSrc = useMemo(() => {
    return EBTI_IMAGES[ebti] || 'https://placehold.co/100x100?text=EBTI';
  }, [ebti]);

  // ✅ 버튼 동작
  const handleGoHome = () => navigate('/teamlistpage');
  const handleReSurvey = () => navigate('/survey');
  const handleMyTeamList = () => {
    navigate('/teamlistpage', { state: { showMyTeamsOnly: true } });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFF8EF] text-lg text-gray-600">
        사용자 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FFF8EF]">
      <div className="flex w-full">
        {/* 사이드바 */}
        <aside className="top:[104px] fixed left-0 hidden h-[calc(100vh-104px)] w-64 border-r border-neutral-200 bg-white shadow-sm sm:block">
          <div className="flex h-full flex-col items-center gap-8 px-6 pt-16 pb-10">
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
              </ul>
            </nav>
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
                    <img
                      src={avatarSrc}
                      alt={ebti}
                      className="h-[120px] w-[120px] object-contain"
                      onError={(e) =>
                        (e.currentTarget.src = 'https://placehold.co/100x100')
                      }
                    />
                  </div>
                </div>

                {/* 정보 */}
                <div className="w-full">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-[100px_1fr]">
                    <dt className="pt-2 text-sm font-semibold text-neutral-600 md:text-right">
                      이름
                    </dt>
                    <dd className="pt-2 text-base text-neutral-900">{name}</dd>

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

                    <dt className="pt-2 text-sm font-semibold text-neutral-600 md:text-right">
                      EBTI 유형
                    </dt>
                    <dd className="pt-2 text-base text-neutral-900">
                      {ebti || '미설정'}
                    </dd>

                    <dt className="pt-2 text-sm font-semibold text-neutral-600 md:text-right">
                      소속 팀
                    </dt>
                    <dd className="pt-2 text-base text-neutral-900">
                      {teams.length > 0
                        ? teams.map((t) => (
                            <div key={t.teamId}>
                              {t.teamName} ({t.role})
                            </div>
                          ))
                        : '소속된 팀이 없습니다.'}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="my-10 h-px w-full bg-yellow-200" />

              {/* 버튼 영역 */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* 재설문 */}
                <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-8">
                  <div className="text-base font-semibold text-neutral-800">
                    EBTI 다시 검사하기
                  </div>
                  <Button
                    variant="primary"
                    width="220px"
                    height="44px"
                    fontSize="14px"
                    onClick={handleReSurvey}
                  >
                    재설문 시작
                  </Button>
                </div>

                {/* 내 팀 보기 */}
                <div className="flex flex-col items-center gap-4 rounded-xl bg-[#FFF8EF] p-8">
                  <div className="text-base font-semibold text-neutral-800">
                    내 팀 보기
                  </div>
                  <Button
                    variant="primary"
                    width="220px"
                    height="44px"
                    fontSize="14px"
                    onClick={handleMyTeamList}
                  >
                    내 팀 목록으로
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
