import React from 'react';
import TeamNamePill from './TeamNamePill';

type TeamRowProps = {
  id: string;
  name: string;
  message: string;
  current: number;
  max: number;
  onEnter: (id: string) => void; // 방입장 클릭 핸들러
};

export default function TeamRow({
  id,
  name,
  message,
  current,
  max,
  onEnter,
}: TeamRowProps) {
  return (
    <div className="inline-flex w-full items-center gap-5 rounded-[30px] bg-orange-50 px-4 py-3">
      <TeamNamePill label={name} />

      <div className="h-10 min-w-0 flex-1 truncate font-['Pretendard_Variable'] text-xl leading-[48px] font-normal text-black">
        {message}
      </div>

      {/* ✅ 노란 버튼 클릭 → 상위 onEnter 호출 */}
      <button
        className="flex h-10 w-36 items-center justify-center rounded-[30px] bg-yellow-400 px-1 transition hover:bg-yellow-500"
        onClick={() => onEnter(id)}
      >
        <div className="text-center font-['Pretendard_Variable'] text-xl leading-[48px] font-normal text-black">
          방 입장 {current}/{max}
        </div>
      </button>
    </div>
  );
}
