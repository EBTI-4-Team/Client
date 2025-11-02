// src/pages/Survey/components/QuestionBox.tsx
import { useSurveyStore } from '../../../stores/ useSurveyStore.ts';

interface QuestionBoxProps {
  index: number;
  text: string;
}

export default function QuestionBox({ index, text }: QuestionBoxProps) {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const { answers, setAnswer } = useSurveyStore();
  const selected = answers[index];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-[922px] flex-col items-start justify-start gap-7">
        <div className="font-[Pretendard_Variable] text-xl font-medium text-black">
          {index}. {text}
        </div>

        <div className="flex flex-wrap items-center justify-start gap-10 px-10">
          {numbers.map((num) => (
            <div
              key={num}
              onClick={() => setAnswer(index, num)}
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl outline outline-1 outline-black/40 transition-all ${
                selected === num
                  ? 'bg-yellow-300 text-white'
                  : 'bg-white hover:bg-yellow-100'
              }`}
            >
              <span className="font-[Pretendard_Variable] text-xl font-medium">
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
