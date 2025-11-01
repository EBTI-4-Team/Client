// ✅ src/pages/LoadingPage.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';
import loadingOwl from '/src/assets/images/loadingOwl.png';
import '/src/index.css'; // Tailwind 포함 전역 CSS

export default function LoadingPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { teamId?: number } };
  const teamId = state?.teamId;

  useEffect(() => {
    const createReport = async () => {
      if (!teamId) {
        alert('팀 정보가 없습니다.');
        navigate('/teamlistpage');
        return;
      }

      try {
        console.log('📡 리포트 생성 요청 중...');
        const res = await axiosInstance.post(`/api/teams/${teamId}/report`);
        const reportId = res.data?.data?.reportId;

        if (!reportId) {
          alert('리포트 생성에 실패했습니다.');
          navigate(`/teampage`, { state: { teamId } });
          return;
        }

        console.log('✅ 리포트 생성 완료:', reportId);

        // ✅ 생성 완료 → feedback 페이지로 이동
        navigate(`/feedback?teamId=${teamId}&reportId=${reportId}`);
      } catch (error) {
        navigate(`/teampage`, { state: { teamId } });
      }
    };

    createReport();
  }, [teamId, navigate]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-orange-50">
      {/* 부엉이 이미지 (360도 회전) */}
      <img
        className="animate-slow-spin mb-8 h-96 w-96 object-contain"
        src={loadingOwl}
        alt="loading owl"
      />

      {/* 로딩 텍스트 */}
      <div className="text-center font-['Inter'] text-3xl font-semibold text-black">
        회원님의 결과를 로딩중입니다. 부엉부엉
      </div>
    </div>
  );
}
