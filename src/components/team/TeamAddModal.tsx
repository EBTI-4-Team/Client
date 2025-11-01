import React from 'react';
import { useTeamModalStore } from '../../stores/teamModalStore';
import { useTeamStore } from '../../stores/teamStore';

export default function TeamAddModal() {
  const { isOpen, fields, setField, close, resetFields } = useTeamModalStore();
  const addTeam = useTeamStore((s) => s.addTeam);

  if (!isOpen) return null;

  const onConfirm = async () => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    await addTeam({
      userId,
      teamName: fields.name.trim(),
      maxMember: Number(fields.capacity),
      teamExplain: fields.message.trim(),
    });

    resetFields();
    close();
  };

  const onCancel = () => {
    resetFields();
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[679px] rounded-[20px] bg-white p-5">
        <div className="mb-6 flex h-10 items-center justify-between rounded-[10px] bg-yellow-400 px-5">
          <div className="text-2xl font-semibold text-white">팀 추가하기</div>
        </div>

        <div className="space-y-4">
          {/* 방명 */}
          <div className="flex items-center gap-4">
            <div className="w-24 rounded-l-[30px] bg-yellow-400 py-2 text-center text-lg">
              팀명
            </div>
            <input
              value={fields.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="예: 개발팀"
              className="flex-1 rounded-r-[30px] bg-orange-50 px-3 py-2 outline-none"
            />
          </div>

          {/* 방인원수 */}
          <div className="flex items-center gap-4">
            <div className="w-24 rounded-l-[30px] bg-yellow-400 py-2 text-center text-lg">
              정원
            </div>
            <input
              type="number"
              min={1}
              value={fields.capacity}
              onChange={(e) => setField('capacity', Number(e.target.value))}
              placeholder="예: 10"
              className="flex-1 rounded-r-[30px] bg-orange-50 px-3 py-2 outline-none"
            />
          </div>

          {/* 소개글 */}
          <textarea
            value={fields.message}
            onChange={(e) => setField('message', e.target.value)}
            placeholder="팀 소개를 적어주세요"
            className="mt-2 h-32 w-full rounded-[20px] bg-orange-50 p-3 outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="rounded-lg bg-yellow-400 px-5 py-3 text-white hover:bg-yellow-500"
          >
            확인
          </button>
          <button
            onClick={onCancel}
            className="rounded-lg bg-neutral-600 px-5 py-3 text-white hover:bg-neutral-700"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
