
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/userList/UserList';
import DashboardMain from './components/dashboardMain/DashboardMain';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardMain />}>
          <Route path='' element={<h1 style={{color:'blue'}}>Dashboard</h1>} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
