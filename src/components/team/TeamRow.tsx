type TeamRowProps = {
  id: string;
  name: string;
  message: string;
  current: number;
  max: number;
  onEnter: (id: string) => void;
  buttonLabel?: string;
};

export default function TeamRow({
  id,
  name,
  message,
  onEnter,
  buttonLabel = '방 참가',
}: TeamRowProps) {
  return (
    <div className="inline-flex min-h-[60px] w-full items-center gap-6 rounded-[20px] bg-white px-5 py-3">
      {/* 팀 이름 */}
      <div className="inline-flex h-full min-w-[100px] items-center justify-center rounded-[10px] bg-primary px-3">
        <div className="text-center font-['Pretendard_Variable'] text-base font-semibold text-white">
          {name}
        </div>
      </div>

      {/* 팀 소개 (자동 줄바꿈 적용) */}
      <div className="flex-1 font-['Pretendard_Variable'] text-sm leading-relaxed break-words whitespace-pre-wrap text-black">
        {message}
      </div>

      {/* 참가 버튼 */}
      <button
        className="flex h-10 w-24 items-center justify-center rounded-[10px] bg-yellow-400 font-['Pretendard_Variable'] text-sm text-white transition hover:bg-yellow-500"
        onClick={(e) => {
          e.stopPropagation();
          onEnter(id);
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
