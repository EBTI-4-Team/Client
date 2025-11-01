import React from 'react';

// ✅ EBTI 유형별 이미지 import
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

// ✅ 모든 EBTI 유형 매핑
const imageMap: Record<string, string> = {
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

type MemberCardProps = {
  name: string;
  ebti: string;
};

export default function MemberCard({ name, ebti }: MemberCardProps) {
  const src = imageMap[ebti] || 'https://placehold.co/57x111?text=No+EBTI';

  return (
    <div className="flex h-64 w-72 shrink-0 flex-col items-center justify-start gap-7 rounded-[10px] bg-white py-5 shadow">
      <img
        className="h-28 w-14 object-contain"
        src={src}
        alt={ebti}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'https://placehold.co/57x111?text=No+Image';
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
