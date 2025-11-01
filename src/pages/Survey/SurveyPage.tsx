// src/pages/Survey/SurveyPage.tsx
import QuestionBox from './component/QuestionBox.tsx';
import Button from '../../components/Button';
import { useSurveyStore } from '../../stores/ useSurveyStore.ts';
// import axiosInstance from "../../apis/axiosInstance";
import { useNavigate } from 'react-router-dom';

export default function SurveyPage() {
  const { answers } = useSurveyStore();
  const navigate = useNavigate();

  const questions = [
    '나는 좋아하는 일을 자주 한다',
    '나는 행복과 보람을 자주 느낀다',
    '내가 어떤 사람인지 자주 생각한다',
    '내가 무엇을 원하는지 자주 생각한다',
    '나는 정보를 얻기 위해 다른 사람들과 자주 교류 한다',
    '나는 정기적으로 신문, 잡지, 뉴스레터 등을 통해 정보를 얻는다',
    '나는 정보검색 할 때 새로운 사업 아이디어에 주목한다',
    '나는 인터넷, SNS 등 매일 하고 새 정보를 적극적으로 검색한다',
    '나는 관계없는 정보, 기술, 아이디어 등 연관성을 잘 발견한다',
    '나는 관계없는 정보, 기술, 아이디어 등을 잘 조합한다',
    '나는 서로 다른 분야 간 연결점을 잘 발견한다',
    '나는 서로 다른 분야 간 연결점을 잘 결합한다',
    '나는 사람들과 대화를 즐기며 자금을 잘 마련한다',
    '나는 이익과 상관없이 콘텐츠 개발에 열정과 헌신을 다한다',
    '나는 사람들을 설득해서 새로운 프로젝트에 참여시키고 앞서 행동을 잘 한다.',
    '나는 사람들에게 용기와 희망을 주며 신중한 편이다',
    '나는 잠재적인 기회를 직감적으로 느낀다',
    '나는 수익성 있는 기회와 비영리 기회를 잘 구분한다',
    '나는 부정 가치보다 긍정 가치를 더 자주 말한다',
    '나는 다양한 기회 중에서 더 선한 것을 잘 선택한다',
  ];

  // ✅ 설문 응답을 백엔드 형식에 맞게 변환
  const buildPayload = () => {
    return {
      data: {
        question: questions.map((_, idx) => ({
          QuestionId: idx,
          answer: answers[idx + 1] || 0, // 응답 없으면 0
        })),
      },
    };
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      alert(`아직 ${questions.length - answeredCount}문항이 남았습니다!`);
      return;
    }

    const payload = buildPayload();
    console.log('📤 전송 준비 데이터:', payload);

    try {
      // ⚙️ 나중에 백엔드 연결 시 이 부분만 주석 해제
      // const res = await axiosInstance.post("/api/survey/result", payload);
      // navigate("/result", { state: res.data });

      alert('✅ 설문 완료! 결과 페이지로 이동합니다. (API 연동 예정)');
      navigate('/result', { state: payload }); // 지금은 mock 데이터로 넘김
    } catch (error) {
      console.error('❌ 설문 전송 실패:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 overflow-y-auto bg-orange-50 p-12">
      {/* 상단 타이틀 */}
      <div className="flex items-center justify-center">
        <div className="flex h-12 w-[700px] items-center justify-center rounded-[20px] bg-yellow-400">
          <div className="font-[Pretendard_Variable] text-4xl font-medium text-white">
            EBTI 유형 검사
          </div>
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="flex w-full max-w-[1000px] flex-col gap-10 rounded-[30px] bg-white p-10 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">
        {questions.map((q, index) => (
          <QuestionBox key={index} index={index + 1} text={q} />
        ))}
      </div>

      {/* 제출 버튼 */}
      <div className="w-80">
        <Button
          variant="primary"
          width="100%"
          height="48px"
          fontSize="20px"
          onClick={handleSubmit}
        >
          내 유형 결과 보기
        </Button>
      </div>
    </div>
  );
}
