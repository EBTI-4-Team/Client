import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EbtiResultPage from './pages/EbtiResultPage';
import LoginPage from './pages/Login/LoginPage.tsx';
import RegisterPage from './pages/Login/RegisterPage.tsx';
import TeamListPage from './pages/TeamListPage';
import TeamPage from './pages/TeamPage';
import SurveyPage from './pages/Survey/SurveyPage.tsx';
import TeamFeedbackPage from './pages/TeamFeedbackPage.tsx';
import TeamListPage from './pages/TeamListPage';

function TeamPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      팀 매칭 페이지 (예정)
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<Layout />}>
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/resultpage" element={<EbtiResultPage />} />
        <Route path="/teamlistpage" element={<TeamListPage />} />
        <Route path="/teamList" element={<TeamPage />} />
        <Route path="/feedback" element={<TeamFeedbackPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
