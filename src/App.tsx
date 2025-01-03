import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { GetStarted } from './pages/GetStarted';
import { ApiKeys } from './pages/ApiKeys';
import { Workspaces } from './pages/Workspaces';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/api-keys" element={<ApiKeys />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}