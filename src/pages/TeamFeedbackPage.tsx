// src/pages/TeamFeedbackPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../apis/axiosInstance';

export default function TeamFeedbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('teamId');
  const reportId = searchParams.get('reportId');

  const [feedback, setFeedback] = useState('');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      if (!teamId || !reportId) {
        setError('teamId 또는 reportId가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/api/teams/${teamId}/report/${reportId}`
        );
        const data = res.data?.data;
        setTeamName(data.teamName || '');
        setFeedback(data.report || '');
      } catch (err) {
        console.error('❌ 리포트 조회 실패:', err);
        setError('리포트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [teamId, reportId]);

  return (
    <div className="w-full bg-orange-50">
      <div className="mx-auto min-h-screen max-w-[1200px] px-4 py-10 sm:px-6 lg:px-10">
        {/* 상단 버튼 */}
        <div className="mb-6 flex items-center justify-start">
          <button
            onClick={() => navigate('/mypage')}
            className="rounded-[16px] bg-yellow-100 px-4 py-2 text-lg font-medium text-black hover:bg-yellow-200"
          >
            MyPage
          </button>
        </div>

        {/* 본문 */}
        <div className="rounded-[16px] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-[Pretendard_Variable] text-2xl font-semibold text-neutral-700">
            {teamName ? `${teamName} 팀 리포트` : '팀 리포트'}
          </h2>

          {loading && <p className="text-gray-500">리포트를 불러오는 중...</p>}

          {!loading && error && (
            <p className="whitespace-pre-wrap text-red-600">{error}</p>
          )}

          {!loading && !error && (
            <p className="leading-relaxed break-words whitespace-pre-line text-neutral-700">
              {feedback || '아직 생성된 팀 리포트가 없습니다.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
