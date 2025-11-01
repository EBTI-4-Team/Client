import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EbtiResultPage() {
  const navigate = useNavigate();

  // ✅ 임시 데이터
  const type = 'ICDE';

  // ✅ 수정된 부분: EBTI 유형에 따라 이미지 파일명 자동 매칭
  const imageUrl = `/images/ebti/${type}.png`;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 overflow-hidden bg-orange-50 pt-[50px]">
      {/* 본문 */}
      <div className="flex w-80 flex-col items-center justify-start">
        <div className="flex flex-col items-center justify-start gap-2 self-stretch">
          <div className="h-11 self-stretch text-center font-['Pretendard_Variable'] text-3xl leading-9 font-semibold text-black">
            당신의 EBTI 유형은:
          </div>
          <div className="h-14 self-stretch text-center font-['Pretendard_Variable'] text-5xl leading-[48px] font-semibold text-black">
            {type}
          </div>
        </div>

        {/* ✅ 수정된 이미지 부분 */}
        <img
          className="mt-4 h-96 w-56 object-contain"
          src={imageUrl}
          alt={type}
          onError={(e) => {
            // 이미지가 없을 경우 기본 placeholder 표시
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/221x429?text=No+Image';
          }}
        />
      </div>

      {/* 버튼 */}
      <button
        onClick={() => navigate('/team')}
        className="flex h-12 w-[600px] items-center justify-center gap-1.5 rounded-lg bg-yellow-400 px-6 py-2"
      >
        <span className="font-['Pretendard_Variable'] text-2xl leading-7 font-semibold text-white">
          팀원 찾으러 가기
        </span>
      </button>
    </div>
  );
}
