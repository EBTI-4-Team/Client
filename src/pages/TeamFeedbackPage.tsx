export default function TeamFeedbackPage() {
  // ✅ 임시 데이터 (나중에 백엔드에서 AI가 생성한 피드백 텍스트로 대체)
  const aiFeedback =
    '우리 팀은 협력과 소통이 잘 이루어지는 팀으로, 각자의 강점을 살려 프로젝트를 효율적으로 완수했습니다. 다만 일정 관리와 역할 분배에서 조금 더 명확한 기준을 세운다면 더욱 높은 완성도를 기대할 수 있습니다.';

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-orange-50 px-4 py-10 sm:px-6 lg:px-10">
      {/* 본문 박스 */}
      <div className="flex min-h-[400px] w-full max-w-[1350px] flex-col items-center justify-center gap-10 rounded-[20px] bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] sm:min-h-[500px] sm:p-10 md:flex-row md:gap-16 lg:min-h-[650px]">
        <div className="flex w-full flex-col items-start justify-start gap-6 sm:gap-8 md:w-[70%]">
          <p className="font-[Pretendard_Variable] text-base leading-relaxed whitespace-pre-line text-neutral-600 sm:text-lg">
            {aiFeedback}
          </p>
        </div>
      </div>
    </div>
  );
}
