#!/bin/bash

echo "🚀 ideaTone 프로젝트 초기화 시작..."

# 1️⃣ git 초기화 (기존 연결 제거)
rm -rf .git
git init -q
echo "✅ Git 초기화 완료"

# 2️⃣ src 정리 (pages, components, assets만 비우기)
echo "🧹 src 폴더 정리 중..."
rm -rf src/pages src/components src/assets
mkdir -p src/pages src/components src/assets
touch src/pages/.keep src/components/.keep src/assets/.keep
echo "✅ pages, components, assets 폴더 정리 완료"

# 3️⃣ App.tsx 초기화
cat << 'EOT' > src/App.tsx
function App() {
  return (
    <div className="flex h-screen items-center justify-center text-3xl font-bold text-gray-700">
      🚀 ideaTone 프로젝트 시작!
    </div>
  );
}
export default App;
EOT
echo "✅ App.tsx 초기화 완료"

# 4️⃣ 의존성 설치
if [ -f yarn.lock ]; then
  echo "📦 yarn.lock 발견 — yarn으로 패키지 설치 중..."
  yarn install --silent
elif [ -f package-lock.json ]; then
  echo "📦 npm 사용 — npm으로 패키지 설치 중..."
  npm install --silent
else
  echo "⚠️ 패키지 매니저 lock 파일을 찾을 수 없습니다. yarn 또는 npm install을 직접 실행해주세요."
fi

# 5️⃣ 첫 커밋
git add .
git commit -m "🎉 ideaTone 프로젝트 초기 세팅 완료" > /dev/null 2>&1

echo ""
echo "✅ 모든 초기화 완료!"
echo "👉 이제 다음 명령으로 실행할 수 있습니다:"
echo ""
echo "   yarn dev"
echo ""
echo "🚀 해커톤 준비 완료 — 성공적인 개발을 응원합니다!"
