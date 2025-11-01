import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EbtiResultPage from './pages/EbtiResultPage';
import LoginPage from './pages/Login/LoginPage.tsx';
import RegisterPage from './pages/Login/RegisterPage.tsx';
import TeamPage from './pages/TeamPage';
import SurveyPage from './pages/Survey/SurveyPage.tsx';
import TeamFeedbackPage from './pages/TeamFeedbackPage.tsx';
import TeamListPage from './pages/TeamListPage';
import MyPage from './pages/MyPage.tsx';
import LoadingPage from './pages/LoadingPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/survey" element={<SurveyPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route element={<Layout />}>
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/resultpage" element={<EbtiResultPage />} />
        <Route path="/teamlistpage" element={<TeamListPage />} />
        <Route path="/teamList" element={<TeamPage />} />
        <Route path="/feedback" element={<TeamFeedbackPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
