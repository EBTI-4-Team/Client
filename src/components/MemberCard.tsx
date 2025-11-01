import React from 'react';

// EBTI 이미지 매핑 (필요한 유형만 추가해서 쓰면 됨)
import ICDEImage from '../assets/images/ICDE.png';
import IDECImage from '../assets/images/IDEC.png';
import IEDCImage from '../assets/images/IEDC.png';
import EDICImage from '../assets/images/EDIC.png';

const imageMap: Record<string, string> = {
  ICDE: ICDEImage,
  IDEC: IDECImage,
  IEDC: IEDCImage,
  EDIC: EDICImage,
};

type MemberCardProps = {
  name: string;
  ebti: string;
};

export default function MemberCard({ name, ebti }: MemberCardProps) {
  const src = imageMap[ebti] || 'https://placehold.co/57x111';

  return (
    <div className="flex h-64 w-72 shrink-0 flex-col items-center justify-start gap-7 rounded-[10px] bg-white py-5 shadow">
      <img
        className="h-28 w-14 object-contain"
        src={src}
        alt={ebti}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/57x111';
        }}
      />
      <div className="flex flex-col items-center justify-start">
        <div className="text-center font-['Pretendard_Variable'] text-2xl leading-8 font-medium text-black">
          {name}
        </div>
        <div className="text-center font-['Pretendard_Variable'] text-2xl leading-8 font-medium text-black">
          {ebti}
        </div>
      </div>
    </div>
  );
}
