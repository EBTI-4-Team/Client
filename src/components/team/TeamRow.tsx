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
    <div className="inline-flex w-full items-center gap-5 rounded-[30px] bg-orange-50 px-4 py-3">
      <div className="inline-flex h-14 w-44 items-center justify-center rounded-tl-[30px] rounded-bl-[30px] bg-yellow-400">
        <div className="text-center font-['Pretendard_Variable'] text-xl leading-[48px] text-black">
          {name}
        </div>
      </div>

      <div className="flex-1 truncate font-['Pretendard_Variable'] text-xl leading-[48px] text-black">
        {message}
      </div>

      <button
        className="flex h-10 w-44 items-center justify-center rounded-[30px] bg-yellow-400 transition hover:bg-yellow-500"
        onClick={(e) => {
          e.stopPropagation();
          onEnter(id);
        }}
      >
        <div className="text-center font-['Pretendard_Variable'] text-xl text-black">
          {buttonLabel}
        </div>
      </button>
    </div>
  );
}
