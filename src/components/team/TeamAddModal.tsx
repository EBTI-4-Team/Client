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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="animate-fade-in w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
        {/* ✅ 상단 헤더 */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-4 text-center text-white">
          <h2 className="text-2xl font-bold">팀 추가하기</h2>
        </div>

        {/* ✅ 본문 */}
        <div className="space-y-6 p-8">
          {/* 팀명 */}
          <div className="space-y-2">
            <label
              htmlFor="teamName"
              className="block text-base font-semibold text-gray-800"
            >
              팀명
            </label>
            <input
              id="teamName"
              placeholder="예: 개발팀"
              value={fields.name}
              onChange={(e) => setField('name', e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-orange-50 px-4 text-base text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* 정원 */}
          <div className="space-y-2">
            <label
              htmlFor="capacity"
              className="block text-base font-semibold text-gray-800"
            >
              정원
            </label>
            <input
              id="capacity"
              type="number"
              min={1}
              placeholder="예: 10"
              value={fields.capacity}
              onChange={(e) => setField('capacity', Number(e.target.value))}
              className="h-12 w-full rounded-lg border border-gray-300 bg-orange-50 px-4 text-base text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* 팀 소개 */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-base font-semibold text-gray-800"
            >
              팀 소개
            </label>
            <textarea
              id="description"
              placeholder="팀 소개를 적어주세요"
              value={fields.message}
              onChange={(e) => setField('message', e.target.value)}
              className="min-h-[160px] w-full resize-none rounded-lg border border-gray-300 bg-orange-50 p-4 text-base text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="h-12 flex-1 rounded-lg border border-gray-300 bg-white text-base font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="h-12 flex-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-base font-semibold text-white transition hover:from-amber-500 hover:to-yellow-500"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
