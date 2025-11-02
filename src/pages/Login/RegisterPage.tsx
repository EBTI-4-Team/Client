import { useState } from 'react';
import AuthInputField from './Component/AuthInputField.tsx';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance'; // ✅ axios 설정 import

export default function RegisterPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  // ✅ 회원가입 처리 함수
  const handleRegister = async () => {
    if (!id || !password || !confirmPw || !phone) {
      alert('모든 항목을 입력해주세요!');
      return;
    }
    if (password !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    // ✅ 백엔드 요구 포맷에 맞춘 데이터
    const payload = {
      phonenumber: phone.replaceAll('-', ''), // 하이픈 제거
      name: id,
      password: password,
    };

    try {
      const res = await axiosInstance.post('/api/auth/signup', payload);

      if (res.status === 200 || res.status === 201) {
        alert('✅ 회원가입이 완료되었습니다!');
        navigate('/login');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      console.error('❌ 회원가입 요청 실패:', error);
      if (error.response) {
        alert(`서버 오류: ${error.response.data.message || '알 수 없는 오류'}`);
      } else {
        alert('서버에 연결할 수 없습니다.');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FFF8EF]">
      {/* ✅ 메인 회원가입 영역 */}
      <div className="flex overflow-hidden rounded-xl bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* 왼쪽 노란 패널 */}
        <div className="flex h-[640px] w-[558px] items-center justify-center bg-yellow-400">
          <div className="font-[Pretendard_Variable] text-5xl font-semibold text-white">
            EBTing
          </div>
        </div>

        {/* 오른쪽 회원가입 폼 */}
        <div className="flex h-[640px] w-[558px] flex-col items-center justify-center gap-10 bg-white px-12">
          <div className="flex w-full flex-col items-center justify-center gap-10">
            {/* 입력 필드 */}
            <div className="flex w-full flex-col gap-5">
              <AuthInputField
                label="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <AuthInputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AuthInputField
                label="Confirm Password"
                type="password"
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
              />
              <AuthInputField
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* 회원가입 버튼 */}
            <Button
              variant="primary"
              width="192px"
              height="48px"
              fontSize="16px"
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </div>

          {/* 로그인 이동 안내 */}
          <div className="text-center text-xs font-medium text-neutral-600 sm:text-sm">
            이미 계정이 있나요?{' '}
            <span
              className="cursor-pointer text-yellow-400 hover:underline"
              onClick={() => navigate('/login')}
            >
              로그인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
