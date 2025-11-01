import React from 'react';

export default function TeamNamePill({ label }: { label: string }) {
  return (
    <div className="inline-flex h-14 w-44 items-center justify-center gap-2.5 rounded-tl-[30px] rounded-bl-[30px] bg-yellow-400 py-2">
      <div className="text-center font-['Pretendard_Variable'] text-xl leading-[48px] text-black">
        {label}
      </div>
    </div>
  );
}
