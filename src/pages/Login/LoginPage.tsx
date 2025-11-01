import { useAuthStore } from '../../stores/UseAuthStore.ts';
import { useNavigate } from 'react-router-dom';
import AuthInputField from './Component/AuthInputField.tsx';
import Button from '../../components/Button';
import Vector2 from '../../assets/images/Vector2.png';
import owl from '../../assets/images/owl.png';

export default function LoginPage() {
  const { id, password, setId, setPassword, login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !password) {
      alert('전화번호와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login();
      alert(`로그인 성공! 환영합니다 👋`);
      navigate('/'); // 로그인 후 메인 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 전화번호 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FFF8EF]">
      {/* 곡선 장식 */}
      <img
        src={Vector2}
        alt="곡선 장식"
        className="pointer-events-none absolute top-[20%] left-0 z-[40] h-auto w-[1100px] opacity-100"
      />

      {/* 부엉이 */}
      <img
        src={owl}
        alt="마스코트"
        className="pointer-events-none absolute top-[6%] right-[5%] z-[50] h-auto w-[280px]"
      />

      {/* 로그인 영역 */}
      <div className="relative z-[30] flex overflow-hidden rounded-xl bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* 왼쪽 패널 */}
        <div className="flex h-[640px] w-[558px] items-center justify-center bg-yellow-400">
          <div className="font-[Pretendard_Variable] text-5xl font-semibold text-white">
            EBTing
          </div>
        </div>

        {/* 오른쪽 폼 */}
        <div className="flex h-[640px] w-[558px] flex-col items-center justify-center gap-10 bg-white px-12">
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <div className="font-[Pretendard_Variable] text-3xl font-semibold text-black">
              Welcome!
            </div>

            <div className="flex w-full flex-col gap-5">
              <AuthInputField
                label="Phone Number"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <AuthInputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="primary"
              width="192px"
              height="48px"
              fontSize="16px"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          {/* 회원가입 이동 */}
          <div className="text-center text-xs font-medium text-neutral-600 sm:text-sm">
            아직 계정이 없나요?{' '}
            <span
              className="cursor-pointer text-yellow-400 hover:underline"
              onClick={() => navigate('/register')}
            >
              회원가입
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
