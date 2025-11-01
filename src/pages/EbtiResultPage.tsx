import { useNavigate, useLocation } from 'react-router-dom';

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

export default function EbtiResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 백엔드에서 전달된 pred 값 (없을 땐 기본 ICDE)
  const type = location.state?.pred || location.state?.type || 'ICDE';

  // ✅ 이미지 매핑
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

  // ✅ 설명 매핑
  const descriptionMap: Record<string, string> = {
    DICE: '바른주의 발견자 — 서로 다른 것을 연결하고 새로운 것을 잘 찾는 발견자형. 내면에 창조자 감각이 있고 균형자 감각이 부족.',
    DIEC: '경험주의 발견자 — 서로 다른 것을 연결하고 새로운 것을 잘 찾는 발견자형. 내면에 균형자 감각이 있고 창조자 감각이 부족.',
    DCIE: '기획하는 발견자 — 선도적으로 헌신하며 새로운 것을 잘 찾는 발견자형. 내면에 혁신자 감각이 있고 균형자 감각이 부족.',
    DCEI: '트렌드 발견자 — 서로 다른 것을 연결하고 새로운 것을 잘 찾는 유형. 내면에 균형자 감각이 있고 혁신자 감각이 부족.',
    DEIC: '일잘러 발견자 — 새로움을 잘 찾고 실행력이 뛰어난 발견자형. 내면에 혁신자 감각이 있고 창조자 감각이 부족.',
    DECI: '호기심현실 발견자 — 호기심 많고 현실적이며 새로움을 찾는 발견자형. 내면에 창조자 감각이 있고 혁신자 감각이 부족.',

    IDCE: '뒤에있는 혁신자 — 새로운 것을 잘 찾고 다름을 융합하는 혁신자형. 내면에 창조자 감각이 있고 균형자 감각이 부족.',
    IDEC: '결과예측 혁신자 — 새로움을 잘 찾고 예측력이 좋은 혁신자형. 내면에 균형자 감각이 있고 창조자 감각이 부족.',
    ICDE: '힙쿨스터 혁신자 — 선도적으로 헌신하며 융합적인 혁신자형. 내면에 발견자 감각이 있고 균형자 감각이 부족.',
    ICED: '신기방기 혁신자 — 선도적이며 다양한 시도를 즐기는 혁신자형. 내면에 균형자 감각이 있고 발견자 감각이 부족.',
    IEDC: '균형찾는 혁신자 — 다름을 융합하며 조화를 추구하는 혁신자형. 내면에 발견자 감각이 있고 창조자 감각이 부족.',
    IECD: '이종결합 혁신자 — 다름을 융합하며 독창적인 결과를 만드는 혁신자형. 내면에 창조자 감각이 있고 발견자 감각이 부족.',

    CDIE: '개척하는 창조자 — 새로운 것을 선도적으로 추진하는 창조자형. 내면에 혁신자 감각이 있고 균형자 감각이 부족.',
    CDEI: '열정호기심 창조자 — 새로움과 열정을 동시에 추구하는 창조자형. 내면에 균형자 감각이 있고 혁신자 감각이 부족.',
    CIDE: '독창주의 창조자 — 다름을 융합하며 독창성을 발휘하는 창조자형. 내면에 발견자 감각이 있고 균형자 감각이 부족.',
    CIED: '열정있는 창조자 — 선도적이며 융합적인 열정형 창조자. 내면에 균형자 감각이 있고 발견자 감각이 부족.',
    CEDI: '신중대담 창조자 — 신중하면서도 실행력이 강한 창조자형. 내면에 발견자 감각이 있고 혁신자 감각이 부족.',
    CEID: '용기있는 창조자 — 선도적으로 헌신하며 실행력이 강한 창조자형. 내면에 혁신자 감각이 있고 발견자 감각이 부족.',

    EDIC: '미식가 균형자 — 새로움을 잘 찾고 좋음을 선별하는 균형자형. 내면에 창조자 감각이 있고 혁신자 감각이 부족.',
    EDCI: '명랑새롬 균형자 — 새로움을 즐기며 조화롭게 행동하는 균형자형. 내면에 혁신자 감각이 있고 창조자 감각이 부족.',
    ECDI: '긍정하는 균형자 — 헌신적이고 조화로운 균형자형. 내면에 발견자 감각이 있고 혁신자 감각이 부족.',
    ECID: '가치선별 균형자 — 선도적으로 행동하며 옳고 그름을 잘 구분하는 균형자형. 내면에 혁신자 감각이 있고 발견자 감각이 부족.',
    EIDC: '해법찾는 균형자 — 다름을 융합하고 해법을 찾는 균형자형. 내면에 발견자 감각이 있고 창조자 감각이 부족.',
    EICD: '판단귀재 균형자 — 다름을 융합하고 냉철한 판단을 하는 균형자형. 내면에 창조자 감각이 있음.',
  };

  const imageUrl =
    imageMap[type] || 'https://placehold.co/221x429?text=No+Image';
  const description = descriptionMap[type] || '유형 설명을 불러올 수 없습니다.';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 overflow-hidden bg-orange-50 pt-[50px]">
      <div className="flex w-80 flex-col items-center justify-start">
        <div className="flex flex-col items-center gap-2 self-stretch">
          <div className="h-11 text-center font-['Pretendard_Variable'] text-3xl font-semibold text-black">
            당신의 EBTI 유형은:
          </div>
          <div className="h-14 text-center font-['Pretendard_Variable'] text-5xl font-semibold text-black">
            {type}
          </div>
        </div>

        <img
          className="mt-4 h-96 w-56 object-contain"
          src={imageUrl}
          alt={type}
        />
        <p className="mt-6 max-w-[480px] text-center font-['Pretendard_Variable'] text-lg leading-relaxed whitespace-pre-line text-neutral-700">
          {description}
        </p>
      </div>

      <button
        onClick={() => navigate('/teamlistpage')}
        className="flex h-12 w-[600px] items-center justify-center rounded-lg bg-yellow-400 px-6 py-2"
      >
        <span className="font-['Pretendard_Variable'] text-2xl font-semibold text-white">
          팀원 찾으러 가기
        </span>
      </button>
    </div>
  );
}
