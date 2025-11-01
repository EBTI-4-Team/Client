import { useNavigate, useLocation } from 'react-router-dom';

// ✅ 이미지 import
import ICDEImage from '../assets/images/ICDE.png';

export default function EbtiResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 설문 결과에서 전달받은 유형 (백엔드 연동 시 실제 값 사용)
  const type = location.state?.type || 'ICDE'; // 백엔드 없을 땐 임시값 ICDE

  // ✅ 유형별 이미지 매핑
  const imageMap: Record<string, string> = {
    ICDE: ICDEImage,
  };

  // ✅ 이미지 경로
  const imageUrl =
    imageMap[type] || 'https://placehold.co/221x429?text=No+Image';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 overflow-hidden bg-orange-50 pt-[50px]">
      {/* 본문 */}
      <div className="flex w-80 flex-col items-center justify-start">
        <div className="flex flex-col items-center justify-start gap-2 self-stretch">
          <div className="h-11 text-center font-['Pretendard_Variable'] text-3xl font-semibold text-black">
            당신의 EBTI 유형은:
          </div>
          <div className="h-14 text-center font-['Pretendard_Variable'] text-5xl font-semibold text-black">
            {type}
          </div>
        </div>

        {/* 이미지 */}
        <img
          className="mt-4 h-96 w-56 object-contain"
          src={imageUrl}
          alt={type}
        />
      </div>

      {/* 버튼 */}
      <button
        onClick={() => navigate('/team')}
        className="flex h-12 w-[600px] items-center justify-center rounded-lg bg-yellow-400 px-6 py-2"
      >
        <span className="font-['Pretendard_Variable'] text-2xl font-semibold text-white">
          팀원 찾으러 가기
        </span>
      </button>
    </div>
  );
}
