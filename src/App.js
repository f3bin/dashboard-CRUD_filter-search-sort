
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import DashboardMain from './components/dashboardMain/DashboardMain';
import UserMain from './pages/UserMain';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardMain />}>
          <Route index element={<h1>Dashboard Main Page</h1>} />
          <Route path="users" element={<UserMain />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
