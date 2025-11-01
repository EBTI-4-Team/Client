import { useNavigate } from 'react-router-dom';

export default function TeamFeedbackPage() {
  const navigate = useNavigate();

  // ✅ 임시 데이터 (나중에 백엔드에서 AI가 생성한 피드백 텍스트로 대체)
  const aiFeedback =
    '우리 팀은 협력과 소통이 잘 이루어지는 팀으로, 각자의 강점을 살려 프로젝트를 효율적으로 완수했습니다. 다만 일정 관리와 역할 분배에서 조금 더 명확한 기준을 세운다면 더욱 높은 완성도를 기대할 수 있습니다.';

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-8 bg-orange-50 px-4 py-10 sm:px-6 lg:px-10">
      {/* ✅ 상단 영역 */}
      <div className="flex w-full max-w-[1296px] items-center justify-between">
        {/* 마이페이지 버튼 */}
        <button
          onClick={() => navigate('/teamlist')}
          className="flex items-center justify-center gap-2 rounded-[20px] bg-yellow-100 px-5 py-2 text-xl font-medium text-black transition hover:bg-yellow-200"
        >
          <div className="flex h-6 w-6 items-center justify-center border border-slate-900">
            <div className="h-3 w-3 border border-slate-900" />
          </div>
          <span>My Page</span>
        </button>
      </div>

      {/* ✅ 본문 박스 */}
      <div className="flex min-h-[400px] w-full max-w-[1350px] flex-col items-center justify-center gap-10 rounded-[20px] bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] sm:min-h-[500px] sm:p-10 md:flex-row md:gap-16 lg:min-h-[650px]">
        <div className="flex w-full flex-col items-start justify-start gap-6 sm:gap-8 md:w-[70%]">
          <h2 className="font-[Pretendard_Variable] text-2xl font-semibold text-neutral-700">
            우리 팀은...
          </h2>

          {/* ✅ AI 피드백 텍스트 */}
          <p className="font-[Pretendard_Variable] text-base leading-relaxed whitespace-pre-line text-neutral-600 sm:text-lg">
            {aiFeedback}
          </p>
        </div>
      </div>
    </div>
  );
}
