#!/bin/bash
echo "🧹 Cleaning pages, components, and assets folders..."

# 1️⃣ 삭제 대상
rm -rf src/pages
rm -rf src/components
rm -rf src/assets

# 2️⃣ 기본 폴더 다시 생성
mkdir -p src/pages src/components src/assets
touch src/pages/.keep src/components/.keep src/assets/.keep

# 3️⃣ App.tsx 초기화 (간단한 기본 페이지로)
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

echo "✅ Cleanup complete! Your project is now ready for a fresh start."
